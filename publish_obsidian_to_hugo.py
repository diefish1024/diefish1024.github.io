import os
import re
import shutil
import yaml
import subprocess
import logging
from datetime import datetime
from urllib.parse import unquote

# --- Configuration ---
OBSIDIAN_VAULT_PATH = r"D:\Document\00-Notes"
OBSIDIAN_ATTACHMENTS_PATH = r"D:\Document\00-Notes\Attachments"
HUGO_SITE_PATH = r"D:\My Projects\Blogs\my-personal-blog"
HUGO_CONTENT_PATH = os.path.join(HUGO_SITE_PATH, "content")
HUGO_STATIC_IMAGES_PATH = os.path.join(HUGO_SITE_PATH, "static", "images")

# --- Publishing Rules & Content Strategy ---
# 1. All notes are published to the 'posts' section for a unified blog feed.
PUBLISH_SOURCE_MAP = {
    "01-Math": "posts/Class Notes",
    "02-CS": "posts/Class Notes",
    "06-Knowledge Base": "posts",
    "03-Research": "posts",
    "04-Projects": "posts",
}

# 2. Automatically assign categories based on the source folder.
CATEGORY_MAP = {
    "01-Math": "course-note",
    "02-CS": "course-note",
    "03-Research": "research",
    "06-Knowledge Base": "concept",
    "04-Projects/Solutions": "solution"
}

# Directories or files to ignore during synchronization
IGNORE_PATTERNS = ["Templates", "Attachments", "Copilot Prompts", ".obsidian", ".trash", "00-Inbox", "05-Journal"]
PUBLISH_KEY = "publish"
MARKDOWN_EXTENSIONS = (".md", ".markdown")

# --- Git Automation ---
ENABLE_GIT_AUTO_COMMIT = True

# --- Logging Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[\s\.]+', '-', text)
    text = re.sub(r'[^\w-]', '', text)
    return text


def pretty_title_from_dirname(name: str) -> str:
    """
    Beautify directory name for title:
    - Replace '-' and '_' with spaces.
    - If no uppercase letters remain, Title Case it.
    - Otherwise keep original casing.
    """
    base = name.replace('-', ' ').replace('_', ' ').strip()
    if not base:
        return name
    if any(c.isupper() for c in base):
        return base
    return base.title()


def ensure_section_index_chain(dest_dir: str, root_content_dir: str):
    """
    From dest_dir up to (but excluding) root_content_dir, create missing _index.md.
    The 'title' is the beautified directory name.
    """
    abs_root = os.path.abspath(root_content_dir)
    current = os.path.abspath(dest_dir)

    # Ensure current is under the content root
    try:
        common = os.path.commonpath([current, abs_root])
    except ValueError:
        return
    if common != abs_root:
        return

    while True:
        if os.path.normcase(current) == os.path.normcase(abs_root):
            # Stop at content root (do not create at content root)
            break

        index_path = os.path.join(current, "_index.md")
        if not os.path.exists(index_path):
            dirname = os.path.basename(current)
            title = pretty_title_from_dirname(dirname)
            fm = {"title": title}
            os.makedirs(current, exist_ok=True)
            with open(index_path, "w", encoding="utf-8") as f:
                f.write(f"---\n{yaml.dump(fm, allow_unicode=True, sort_keys=False)}---\n")
            logging.info(f"Created section index: {os.path.relpath(index_path, HUGO_SITE_PATH)}")

        parent = os.path.dirname(current)
        if parent == current:
            break
        current = parent


def process_content(main_content, note_slug):
    """Processes content to convert LaTeX to shortcodes and update image links."""
    processed_content = main_content
    # --- 1. Convert LaTeX to Shortcodes ---
    display_math_pattern = re.compile(r'\$\$(.*?)\$\$', re.DOTALL)
    content_after_display = display_math_pattern.sub(r'{{< math >}}\n\1\n{{< /math >}}', processed_content)
    inline_math_pattern = re.compile(r'\$([^\$]+?)\$')
    content_after_latex = inline_math_pattern.sub(r'{{< imath >}}\1{{< /imath >}}', content_after_display)
    # --- 2. Split into code fences / inline code vs normal text (do not touch code) ---
    fence_re = re.compile(
        r'(?P<fence>(^|\n)(```|~~~)[^\n]*\n.*?\n\3[ \t]*\n?)'  # fenced code block ``` or ~~~
        r'|(?P<inline>`[^`\n]+`)',                             # inline code `...`
        re.DOTALL
    )
    # Pattern for math-like '<' fix: add a space after '<' if preceded by letter/digit/underscore/closing bracket
    safe_left_chars = r'A-Za-z0-9_\)\]\}'
    lt_fix = re.compile(r'(?<=[' + safe_left_chars + r'\u00C0-\u024F\u0370-\u03FF\u0400-\u04FF])<')
    # Robust image pattern (outside code only):
    #   ![alt](url "optional title")
    image_pattern = re.compile(
        r'!\[(?P<alt>[^\]]*)\]\('
        r'(?P<src>[^)\s]+)'                 # url without spaces; handles %20 等
        r'(?:\s+"[^"]*")?'                  # optional title
        r'\)'
    )
    def replace_image_links(match):
        alt_text = match.group('alt')
        original_path = match.group('src')
        decoded_path = unquote(original_path)
        # Keep http/https and absolute paths unchanged
        if decoded_path.startswith(('http://', 'https://', '/')):
            return match.group(0)
        image_filename = os.path.basename(decoded_path)
        source_image_path = os.path.join(OBSIDIAN_ATTACHMENTS_PATH, image_filename)
        if not os.path.exists(source_image_path):
            logging.warning(f"Image not found at resolved path: {source_image_path}")
            return f"![{alt_text}]({original_path})"
        # Preserve extension; slugify only the stem
        stem, ext = os.path.splitext(os.path.basename(source_image_path))
        slugified_image_name = slugify(stem) + ext.lower()
        note_image_dir = os.path.join(HUGO_STATIC_IMAGES_PATH, note_slug)
        os.makedirs(note_image_dir, exist_ok=True)
        dest_image_path = os.path.join(note_image_dir, slugified_image_name)
        shutil.copy2(source_image_path, dest_image_path)
        logging.info(f"  - Copied image: {os.path.basename(source_image_path)} -> {os.path.relpath(dest_image_path, HUGO_SITE_PATH)}")
        web_path = f"/images/{note_slug}/{slugified_image_name}"
        return f"![{alt_text}]({web_path})"
    # Process non-code segments: first image links, then '<' safety fix
    parts = []
    last = 0
    for m in fence_re.finditer(content_after_latex):
        normal_seg = content_after_latex[last:m.start()]
        # images outside code
        normal_seg = image_pattern.sub(replace_image_links, normal_seg)
        # '<' safety outside code
        normal_seg = lt_fix.sub('< ', normal_seg)
        parts.append(normal_seg)
        # keep code fence / inline code intact
        parts.append(m.group(0))
        last = m.end()
    tail = content_after_latex[last:]
    tail = image_pattern.sub(replace_image_links, tail)
    tail = lt_fix.sub('< ', tail)
    parts.append(tail)
    final_content = ''.join(parts)
    return final_content


def process_and_copy_note(source_path, dest_path):
    """Reads, processes, and writes a single markdown note."""
    try:
        with open(source_path, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter_dict = {}
        main_content = content

        if content.startswith('---'):
            parts = content.split('---', 2)
            if len(parts) > 2:
                frontmatter_dict = yaml.safe_load(parts[1]) or {}
                main_content = parts[2].lstrip()

        # Converts 'created' field to 'date' and formats it to ISO 8601 for Hugo.
        if 'created' in frontmatter_dict:
            created_val = frontmatter_dict.pop('created')
            try:
                if isinstance(created_val, datetime):
                    dt_obj = created_val
                else:
                    dt_obj = datetime.strptime(str(created_val).strip(), '%Y-%m-%d %H:%M')
                frontmatter_dict['date'] = dt_obj.strftime('%Y-%m-%dT%H:%M:%S+08:00')
            except (ValueError, TypeError) as e:
                logging.warning(f"Could not parse 'created' date '{created_val}' in {os.path.basename(source_path)}. Error: {e}. Using original value.")
                frontmatter_dict['date'] = created_val

        # --- Automatic Title, Category, and Tag logic ---
        title = os.path.splitext(os.path.basename(source_path))[0]
        frontmatter_dict['title'] = title
        note_slug = slugify(title)
        relative_source_path = os.path.relpath(source_path, OBSIDIAN_VAULT_PATH)

        # Set category automatically
        if 'type' in frontmatter_dict and frontmatter_dict['type']:
            type_value = frontmatter_dict['type']
            if isinstance(type_value, list):
                frontmatter_dict['categories'] = type_value
            else:
                frontmatter_dict['categories'] = [str(type_value)]
            del frontmatter_dict['type']
            logging.debug(f"Used 'type' field for categories in {os.path.basename(source_path)}")
        else:
            source_root_folder = relative_source_path.split(os.sep)[0]
            if source_root_folder in CATEGORY_MAP:
                frontmatter_dict['categories'] = [CATEGORY_MAP[source_root_folder]]

        if 'tags' not in frontmatter_dict:
            frontmatter_dict['tags'] = []

        # Process content for LaTeX and images
        processed_content = process_content(main_content, note_slug)

        # Ensure destination directory and its section _index.md chain
        dest_dir = os.path.dirname(dest_path)
        os.makedirs(dest_dir, exist_ok=True)
        ensure_section_index_chain(dest_dir, HUGO_CONTENT_PATH)

        # Rebuild and write file
        new_fm_str = yaml.dump(frontmatter_dict, allow_unicode=True, sort_keys=False)
        final_output = f"---\n{new_fm_str}---\n{processed_content}"

        with open(dest_path, 'w', encoding='utf-8') as f:
            f.write(final_output)

        logging.info(f"Processed: {relative_source_path} -> {os.path.relpath(dest_path, HUGO_SITE_PATH)}")
        return True

    except Exception as e:
        logging.error(f"Failed to process {source_path}: {e}")
        return False


def get_publish_status(file_path):
    """Quickly checks the 'publish' key in a file's frontmatter."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines(1024)
            if not lines or lines[0].strip() != '---':
                return False
            for line in lines[1:]:
                if line.strip() == '---':
                    break
                if line.strip().startswith('publish:'):
                    return 'true' in line.lower()
    except Exception:
        return False
    return False


def should_ignore(path, root_vault_path):
    relative_path = os.path.relpath(path, root_vault_path)
    for pattern in IGNORE_PATTERNS:
        if pattern in relative_path.split(os.sep):
            return True
    return False


def map_obsidian_path_to_hugo(obsidian_file_path, vault_path, publish_map):
    relative_path_in_vault = os.path.relpath(obsidian_file_path, vault_path)
    for obs_source_dir, hugo_target_section in publish_map.items():
        if relative_path_in_vault.startswith(obs_source_dir):
            path_within_source = os.path.relpath(relative_path_in_vault, obs_source_dir)
            hugo_target_dir = os.path.join(HUGO_CONTENT_PATH, hugo_target_section)
            base_name = os.path.splitext(os.path.basename(path_within_source))[0]
            extension = os.path.splitext(path_within_source)[1]
            slugified_filename = slugify(base_name) + extension
            sub_dir = os.path.dirname(path_within_source)
            return os.path.join(hugo_target_dir, sub_dir, slugified_filename)
    return None


def sync_obsidian_to_hugo():
    logging.info("Starting Obsidian to Hugo synchronization...")
    expected_hugo_files = set()

    for root, dirs, files in os.walk(OBSIDIAN_VAULT_PATH):
        dirs[:] = [d for d in dirs if not should_ignore(os.path.join(root, d), OBSIDIAN_VAULT_PATH)]
        if should_ignore(root, OBSIDIAN_VAULT_PATH):
            continue

        for file_name in files:
            if file_name.endswith(MARKDOWN_EXTENSIONS):
                obsidian_file_path = os.path.join(root, file_name)
                hugo_target_path = map_obsidian_path_to_hugo(obsidian_file_path, OBSIDIAN_VAULT_PATH, PUBLISH_SOURCE_MAP)

                if hugo_target_path:
                    if get_publish_status(obsidian_file_path):
                        if process_and_copy_note(obsidian_file_path, hugo_target_path):
                            expected_hugo_files.add(hugo_target_path)
                    else:
                        if os.path.exists(hugo_target_path):
                            os.remove(hugo_target_path)
                            logging.info(f"Removed (publish not true): {os.path.relpath(hugo_target_path, HUGO_SITE_PATH)}")

    logging.info("Synchronization and processing finished.")
    run_hugo_build_and_git()


def run_hugo_build_and_git():
    logging.info("Running Hugo build command...")
    hugo_build_success = False
    try:
        os.chdir(HUGO_SITE_PATH)
        subprocess.run(["hugo", "--minify"], check=True, capture_output=True, text=True, encoding='utf-8')
        logging.info("Hugo build successful!")
        hugo_build_success = True
    except subprocess.CalledProcessError as e:
        logging.error(f"Hugo build failed: {e}\nStderr: {e.stderr}\nStdout: {e.stdout}")
    except FileNotFoundError:
        logging.error("Hugo command not found. Make sure Hugo is installed and in your PATH.")

    if hugo_build_success and ENABLE_GIT_AUTO_COMMIT:
        run_git_commands()


def run_git_commands():
    logging.info("Starting Git auto-commit...")
    if os.getcwd() != HUGO_SITE_PATH:
        os.chdir(HUGO_SITE_PATH)

    try:
        logging.info("Running 'git add .'")
        subprocess.run(["git", "add", "."], check=True)

        status_result = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True)
        if not status_result.stdout:
            logging.info("No changes to commit. Skipping commit and push.")
            return

        commit_message = f"Site update via script: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        subprocess.run(["git", "commit", "-m", commit_message], check=True)
        logging.info("Running 'git push'...")
        subprocess.run(["git", "push"], check=True)
        logging.info("Git commands executed successfully!")
    except Exception as e:
        logging.error(f"A Git command failed: {e}")


if __name__ == "__main__":
    if not os.path.isdir(OBSIDIAN_VAULT_PATH):
        logging.error(f"Obsidian Vault path does not exist: {OBSIDIAN_VAULT_PATH}")
    elif not os.path.isdir(HUGO_SITE_PATH):
        logging.error(f"Hugo site path does not exist: {HUGO_SITE_PATH}")
    else:
        sync_obsidian_to_hugo()
