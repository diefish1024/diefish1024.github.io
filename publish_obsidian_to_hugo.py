import os
import shutil
import yaml
import subprocess
import logging
from datetime import datetime

# --- Configuration ---
# Absolute path to your Obsidian Vault
OBSIDIAN_VAULT_PATH = r"D:\Document\00-Notes"
# Absolute path to your Hugo site root
HUGO_SITE_PATH = r"D:\My Projects\Blogs\my-personal-blog"

# Path to the Hugo content directory (usually HUGO_SITE_PATH/content)
HUGO_CONTENT_PATH = os.path.join(HUGO_SITE_PATH, "content")

# Map of source directories in Obsidian to target sections in Hugo's content directory
# Key: Relative path in Obsidian Vault. Value: Subfolder in Hugo's content/ directory.
PUBLISH_SOURCE_MAP = {
    "01-Math": "notes",
    "02-CS": "notes",
    # "03-Research": "research",
    # "04-Projects": "projects",
}

# Directories or files to ignore during synchronization
IGNORE_PATTERNS = ["Templates", "Attachments", "Copilot Prompts", ".obsidian", ".trash", "00-Inbox", "05-Journal"]

# --- YAML Frontmatter & Content ---
# The key in YAML frontmatter to check for publish status
PUBLISH_KEY = "publish"
# Markdown file extensions to process
MARKDOWN_EXTENSIONS = (".md", ".markdown")

# --- Git Automation ---
# Set to True to enable automatic Git commit and push after a successful build
ENABLE_GIT_AUTO_COMMIT = True

# --- Logging Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


def read_and_process_markdown(file_path):
    """
    Reads a markdown file, separates frontmatter and content,
    and automatically determines the title.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter_dict = {}
        main_content = content
        title = None

        # Separate frontmatter from content
        if content.startswith('---'):
            parts = content.split('---', 2)
            if len(parts) > 2:
                try:
                    frontmatter_dict = yaml.safe_load(parts[1]) or {}
                    main_content = parts[2].lstrip()
                except yaml.YAMLError as e:
                    logging.error(f"Error parsing YAML in {file_path}: {e}")
                    # Treat as if no frontmatter exists
                    main_content = content
            else:
                 # Malformed frontmatter, treat as content
                 main_content = content
        else:
            # No frontmatter found
            main_content = content


        # Case 1: Title is the first line H1 (e.g., "# My Title")
        if main_content.startswith('# '):
            lines = main_content.splitlines()
            title = lines[0][2:].strip()
            main_content = '\n'.join(lines[1:]).lstrip()
            logging.debug(f"Found title in H1: '{title}'")
        
        # Case 2: No H1 title, use the filename
        else:
            title = os.path.splitext(os.path.basename(file_path))[0]
            logging.debug(f"Using filename as title: '{title}'")

        # Update title in frontmatter
        frontmatter_dict['title'] = title

        return frontmatter_dict, main_content

    except Exception as e:
        logging.error(f"Error reading and processing file {file_path}: {e}")
        return None, None


def should_ignore(path, root_vault_path):
    """Checks if a given path should be ignored based on IGNORE_PATTERNS."""
    relative_path = os.path.relpath(path, root_vault_path)
    for pattern in IGNORE_PATTERNS:
        if pattern in relative_path.split(os.sep):
            return True
    return False


def map_obsidian_path_to_hugo(obsidian_file_path, vault_path, publish_map):
    """Maps an Obsidian file path to its corresponding Hugo content path."""
    relative_path_in_vault = os.path.relpath(obsidian_file_path, vault_path)
    
    for obs_source_dir, hugo_target_section in publish_map.items():
        if relative_path_in_vault.startswith(obs_source_dir):
            path_within_source = os.path.relpath(relative_path_in_vault, obs_source_dir)
            hugo_target_dir = os.path.join(HUGO_CONTENT_PATH, hugo_target_section)
            return os.path.join(hugo_target_dir, path_within_source)
    
    return None


def sync_obsidian_to_hugo():
    """Main function to synchronize Obsidian notes to the Hugo site."""
    logging.info("Starting Obsidian to Hugo synchronization...")

    expected_hugo_files = set()

    for root, dirs, files in os.walk(OBSIDIAN_VAULT_PATH):
        # Exclude ignored directories
        dirs[:] = [d for d in dirs if not should_ignore(os.path.join(root, d), OBSIDIAN_VAULT_PATH)]
        
        if should_ignore(root, OBSIDIAN_VAULT_PATH):
            continue

        for file_name in files:
            if file_name.endswith(MARKDOWN_EXTENSIONS):
                obsidian_file_path = os.path.join(root, file_name)
                hugo_target_path = map_obsidian_path_to_hugo(obsidian_file_path, OBSIDIAN_VAULT_PATH, PUBLISH_SOURCE_MAP)
                
                if hugo_target_path:
                    # We need to read the frontmatter to check the publish key first
                    # Using a simplified parser just for the key check
                    temp_fm = {}
                    try:
                        with open(obsidian_file_path, 'r', encoding='utf-8') as f:
                            lines = f.readlines()
                            if lines and lines[0].strip() == '---':
                                fm_lines = []
                                for line in lines[1:]:
                                    if line.strip() == '---':
                                        break
                                    fm_lines.append(line)
                                temp_fm = yaml.safe_load("".join(fm_lines)) or {}
                    except Exception:
                        pass # Ignore errors here, main parser will handle it
                    
                    if temp_fm.get(PUBLISH_KEY) is True:
                        # Process and write the file
                        frontmatter, main_content = read_and_process_markdown(obsidian_file_path)
                        
                        if frontmatter is not None:
                            os.makedirs(os.path.dirname(hugo_target_path), exist_ok=True)
                            
                            # Rebuild the file content
                            new_fm_str = yaml.dump(frontmatter, allow_unicode=True, sort_keys=False)
                            final_output = f"---\n{new_fm_str}---\n{main_content}"
                            
                            # Write the processed file to the Hugo directory
                            with open(hugo_target_path, 'w', encoding='utf-8') as f:
                                f.write(final_output)

                            logging.info(f"Processed/Updated: {os.path.relpath(obsidian_file_path, OBSIDIAN_VAULT_PATH)} -> {os.path.relpath(hugo_target_path, HUGO_SITE_PATH)}")
                            expected_hugo_files.add(hugo_target_path)
                    else:
                        # If publish is not true, remove the file from Hugo if it exists
                        if os.path.exists(hugo_target_path):
                            os.remove(hugo_target_path)
                            logging.info(f"Removed (publish not true): {os.path.relpath(hugo_target_path, HUGO_SITE_PATH)}")

    # Cleanup stale files in Hugo content directory
    logging.info("Cleaning up Hugo content directory...")
    for root, dirs, files in os.walk(HUGO_CONTENT_PATH):
        top_level_dir = os.path.relpath(root, HUGO_CONTENT_PATH).split(os.sep)[0]
        if top_level_dir in PUBLISH_SOURCE_MAP.values():
            for file_name in files:
                if file_name.endswith(MARKDOWN_EXTENSIONS):
                    hugo_file_path = os.path.join(root, file_name)
                    if hugo_file_path not in expected_hugo_files:
                        os.remove(hugo_file_path)
                        logging.info(f"Cleaned up stale file: {os.path.relpath(hugo_file_path, HUGO_SITE_PATH)}")
            # Attempt to remove empty directories
            try:
                if not os.listdir(root):
                    os.rmdir(root)
                    logging.debug(f"Removed empty directory: {os.path.relpath(root, HUGO_SITE_PATH)}")
            except OSError:
                pass


    logging.info("Obsidian to Hugo synchronization complete.")

    # Run Hugo build command
    logging.info("Running Hugo build command...")
    hugo_build_success = False
    try:
        os.chdir(HUGO_SITE_PATH)
        subprocess.run(["hugo", "--minify"], check=True, capture_output=True, text=True, encoding='utf-8')
        logging.info("Hugo build successful!")
        hugo_build_success = True
    except subprocess.CalledProcessError as e:
        logging.error(f"Hugo build failed: {e}")
        logging.error(f"Stderr: {e.stderr}")
        logging.error(f"Stdout: {e.stdout}")
    except FileNotFoundError:
        logging.error("Hugo command not found. Make sure Hugo is installed and in your PATH.")

    # Run Git commands if build was successful and feature is enabled
    if hugo_build_success and ENABLE_GIT_AUTO_COMMIT:
        run_git_commands()

def run_git_commands():
    """Executes Git commands to commit and push website updates."""
    logging.info("Starting Git auto-commit...")
    
    if os.getcwd() != HUGO_SITE_PATH:
        logging.warning("Changing directory to Hugo site path for Git commands.")
        os.chdir(HUGO_SITE_PATH)

    try:
        # Add all changes. Using '.' is simple. For more safety, you could use:
        # ["git", "add", "content", "public", "resources"]
        logging.info("Running 'git add .'")
        subprocess.run(["git", "add", "."], check=True)

        commit_message = f"Site update via script: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        logging.info(f"Running 'git commit' with message: \"{commit_message}\"")
        
        # Check if there are changes to commit
        status_result = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True)
        if not status_result.stdout:
            logging.info("No changes to commit. Skipping commit and push.")
            return

        subprocess.run(["git", "commit", "-m", commit_message], check=True)

        logging.info("Running 'git push'...")
        subprocess.run(["git", "push"], check=True)

        logging.info("Git commands executed successfully!")

    except FileNotFoundError:
        logging.error("Git command not found. Make sure Git is installed and in your PATH.")
    except subprocess.CalledProcessError as e:
        logging.error(f"A Git command failed with exit code {e.returncode}")
        logging.error(f"Stderr: {e.stderr.strip() if e.stderr else 'N/A'}")
        logging.error(f"Stdout: {e.stdout.strip() if e.stdout else 'N/A'}")
        logging.warning("Your local repository might be in a partially committed state. Please check it manually.")

if __name__ == "__main__":
    if not os.path.isdir(OBSIDIAN_VAULT_PATH):
        logging.error(f"Obsidian Vault path does not exist or is not a directory: {OBSIDIAN_VAULT_PATH}")
    elif not os.path.isdir(HUGO_SITE_PATH):
        logging.error(f"Hugo site path does not exist or is not a directory: {HUGO_SITE_PATH}")
    else:
        sync_obsidian_to_hugo()