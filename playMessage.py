# this is the file watcher that runs on my proxmox node, it listens for the annoy.wav and plays it automatically

import os
import time
import subprocess

FOLDER = "/mnt/pve/media/mikebot/temp"
FILENAME = "annoy.wav"

print(f"Waiting for {FILENAME} in {FOLDER}")

while True:
    path = os.path.join(FOLDER, FILENAME)
    if os.path.isfile(path):
        print(f"Found {path}, playing...")
        subprocess.run(["ffplay", "-nodisp", "-autoexit", path]) #plays wav file with ffmpeg

        time.sleep(3) # TODO: make this wait long enough for the file lock to actually be gone

        try: #delete the file
            os.remove(path)
            print(f"Deleted {path}")
        except Exception as e:
            print(f"Failed to delete {path}: {e}")
    time.sleep(1.5)
