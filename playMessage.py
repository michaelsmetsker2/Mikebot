# this is the file watcher that runs on my proxmox node, it listens for the annoy.wav and plays it automatically

import os
import time
import subprocess

FOLDER = "/mnt/pve/media/mikebot/temp"
NAME = "annoy"
EXTENSIONS = [".wav", ".mp3", ".m4a", ".aac", ".ogg", ".flac"]

print(f"Waiting for annoy file in {FOLDER}")

while True:
    
    files = os.listdir(FOLDER)
    for file in files:
        if file.startswith(NAME) and any(file.endswith(ext) for ext in EXTENSIONS):
            path = os.path.join(FOLDER, file)
            print(f"Found {path}, playing...")
            subprocess.run(["ffplay", "-nodisp", "-autoexit", path]) #plays wav file with ffmpeg

            time.sleep(.5) # TODO: make this wait long enough for the file lock to actually be gone

            try: #delete the file
                os.remove(path)
                print(f"Deleted {path}")
            except Exception as e:
                print(f"Failed to delete {path}: {e}")
    time.sleep(1.5)
