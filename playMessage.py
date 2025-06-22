# this is the file watcher that runs on my proxmox node, it listens for the annoy.wav and plays it automatically

import os
import time
import subprocess

FOLDER = "/mnt/pve/media/mikebot/temp"
FILENAME = "annoy.wav"

print(f"Polling {FOLDER} for {FILENAME}... Press Ctrl+C to stop.")

while True:
    path = os.path.join(FOLDER, FILENAME)
    if os.path.isfile(path):
        print(f"Found {path}, playing...")
        subprocess.run(["ffplay", "-nodisp", "-autoexit", path])
        try:
            os.remove(path)
            print(f"Deleted {path}")
        except Exception as e:
            print(f"Failed to delete {path}: {e}")
    time.sleep(1.5)
