import os
import re
import shutil
import yaml
import subprocess
import logging
from datetime import datetime

# --- Configuration ---
OBSIDIAN_VAULT_PATH = r"D:\Document\00-Notes"
HUGO_SITE_PATH = r"D:\My Projects\Blogs\my-personal-blog"
HUGO_CONTENT_PATH = os.path.join(HUGO_SITE_PATH, "content")
HUGO_STATIC_IMAGES_PATH = os.path.join(HUGO_SITE_PATH, "static", "images")

# --- Publishing Rules & Content Strategy ---
# 1. All notes are published to the 'posts' section for a unified blog feed.
PUBLISH_SOURCE_MAP = {
    "01-Math": "posts",
    "02-CS": "posts",
    "06-Knowledge Base": "posts",
    "03-Research": "posts",
}

# 2. Automatically assign categories based on the source folder.
CATEGORY_MAP = {
    "01-Math": "course-note",
    "02-CS": "course-note",
    "03-Research": "research",
    "06-Knowledge Base": "concept",
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


def process_content(main_content, source_note_path, note_slug):
    """Processes markdown content for LaTeX and standard image links ![]()."""
    
    # 1. Handle LaTeX subscript escaping
    def escape_latex_underscores(match):
        return f"{match.group(1)}{match.group(2).replace('_', r'\\_')}{match.group(1)}"
    latex_pattern = re.compile(r'(\${1,2})(.+?)\1', re.DOTALL)
    processed_content = latex_pattern.sub(escape_latex_underscores, main_content)

    # 2. Handle standard Markdown image links ![]()
    def replace_image_links(match):
        alt_text = match.group(1)
        original_path = match.group(2)

        # Skip web links and absolute paths
        if original_path.startswith(('http://', 'https://', '/')):
            return match.group(0)

        # Resolve the absolute path of the source image
        source_dir = os.path.dirname(source_note_path)
        source_image_path = os.path.abspath(os.path.join(source_dir, original_path))

        if not os.path.exists(source_image_path):
            logging.warning(f"Image not found at resolved path: {source_image_path}")
            return f"![{alt_text}]()"

        image_name = os.path.basename(source_image_path)
        slugified_image_name = slugify(image_name)
        note_image_dir = os.path.join(HUGO_STATIC_IMAGES_PATH, note_slug)
        os.makedirs(note_image_dir, exist_ok=True)
        dest_image_path = os.path.join(note_image_dir, slugified_image_name)
        
        shutil.copy2(source_image_path, dest_image_path)
        logging.info(f"  - Copied image: {image_name} -> {os.path.relpath(dest_image_path, HUGO_SITE_PATH)}")
        
        web_path = f"/images/{note_slug}/{slugified_image_name}"
        return f"![{alt_text}]({web_path})"

    image_pattern = re.compile(r'!\[(.*?)\]\((.*?)\)')
    final_content = image_pattern.sub(replace_image_links, processed_content)
    
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
        
        # --- Automatic Title, Category, and Tag logic ---
        # Title is always the filename
        title = os.path.splitext(os.path.basename(source_path))[0]
        frontmatter_dict['title'] = title
        note_slug = slugify(title)
        
        # Set category automatically
        # 1. Prioritize the 'type' field from the source file's frontmatter.
        if 'type' in frontmatter_dict and frontmatter_dict['type']:
            type_value = frontmatter_dict['type']
            # Ensure 'categories' is always a list
            if isinstance(type_value, list):
                frontmatter_dict['categories'] = type_value
            else:
                frontmatter_dict['categories'] = [str(type_value)]
            # Remove the old 'type' key to avoid redundancy
            del frontmatter_dict['type']
            logging.debug(f"Used 'type' field for categories in {os.path.basename(source_path)}")
        
        # 2. If 'type' doesn't exist, fall back to CATEGORY_MAP.
        else:
            relative_source_path = os.path.relpath(source_path, OBSIDIAN_VAULT_PATH)
            source_root_folder = relative_source_path.split(os.sep)[0]
            if source_root_folder in CATEGORY_MAP:
                frontmatter_dict['categories'] = [CATEGORY_MAP[source_root_folder]]

        # Set tags for specific subfolders
        if 'tags' not in frontmatter_dict:
            frontmatter_dict['tags'] = []
        
        # Process content for LaTeX and images
        processed_content = process_content(main_content, source_path, note_slug)

        # Rebuild and write file
        new_fm_str = yaml.dump(frontmatter_dict, allow_unicode=True, sort_keys=False)
        final_output = f"---\n{new_fm_str}---\n{processed_content}"
        
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
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
            lines = f.readlines(1024) # Read first ~1KB
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

# The rest of the script (`should_ignore`, `map_obsidian_path_to_hugo`, `sync_obsidian_to_hugo`, `run_git_commands`, `__main__`) can remain largely the same.
# The `sync_obsidian_to_hugo` function will now call `get_publish_status`.
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
            # Use a slugified filename for the destination markdown file
            base_name = os.path.splitext(os.path.basename(path_within_source))[0]
            extension = os.path.splitext(path_within_source)[1]
            slugified_filename = slugify(base_name) + extension
            # Preserve sub-directory structure within the section
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
    # Add cleanup logic here if needed
    
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