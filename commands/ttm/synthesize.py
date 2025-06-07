print("synthesize.py started")
import torch
from TTS.api import TTS
from dotenv import load_dotenv
import ffmpeg
import os
import time
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

load_dotenv(dotenv_path = os.path.join("../../.env"))
TEMP_DIR = os.getenv("TEMP_DIR")

TEMP_WAV_PATH = os.path.join(TEMP_DIR, "ttm_temp.wav")
FINAL_WAV_PATH = os.path.join(TEMP_DIR, "ttm.wav")

if len(sys.argv) < 2:
    print("Usage: python synthesize.py \"message\"")
    sys.exit(1)

message = sys.argv[1]

device = "cuda" if torch.cuda.is_available() else "cpu" # Use GPU if available
start_time = time.time()

tts = TTS(
    model_path = os.path.join(SCRIPT_DIR, "./minimike"),
    config_path = os.path.join(SCRIPT_DIR, "./minimike/config.json")
).to(device)
print("model initialized")

tts.tts_to_file(
    text  =message,
    speaker_wav = os.path.join(SCRIPT_DIR, "./datasichael/wavs/001.wav"),
    language = "en",
    file_path = TEMP_WAV_PATH
)
print("audio synthesized")

(
    ffmpeg
    .input(TEMP_WAV_PATH)
    .output(FINAL_WAV_PATH, af='asetrate=24000,aresample=24000', ar='24000')
    .overwrite_output()
    .run(quiet = True) # remove quiet=True for ffmpeg output
)
print("audio resampled")

os.remove(TEMP_WAV_PATH) # clean up temp file

end_time = time.time()
elapsed_time = end_time - start_time
print(f"request completed in: {elapsed_time:.2f} seconds")
