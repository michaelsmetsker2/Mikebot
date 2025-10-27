import os
import time
import subprocess

FOLDER = "/mnt/pve/media/mikebot/temp"
NAME = "annoy"
EXTENSIONS = [".mp3", ".m4a", ".aac", ".ogg"]

BT_DEVICE = "6D:51:EE:AE:DA:7E"
BT_PROFILE = "a2dp"

print(f"Waiting for annoy file in {FOLDER}")

while True:
    
    files = os.listdir(FOLDER)
    for file in files:
        if file.startswith(NAME) and any(file.endswith(ext) for ext in EXTENSIONS):
            path = os.path.join(FOLDER, file)
            print(f"Found {path}, playing...")

            try:
                subprocess.run([
                    "mpg123",
                    "-a", f"bluealsa:DEV={BT_DEVICE},PROFILE={BT_PROFILE}",
                    path
                ], check=True)
            except subprocess.CalledProcessError as e:
                print(f"Playback failed for {path}: {e}")

            time.sleep(0.75)  # small pause before deletion

            try: #delete the file
                os.remove(path)
                print(f"Deleted {path}")
            except Exception as e:
                print(f"Failed to delete {path}: {e}")
    time.sleep(1.5)
