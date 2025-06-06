print("starting synthesize.py")
import torch
from TTS.api import TTS
import ffmpeg
import os
import time
import sys

if len(sys.argv) < 2:
    print("Usage: python synthesize.py \"message\"")
    sys.exit(1)

message = sys.argv[1]
print("received request ", message)

device = "cuda" if torch.cuda.is_available() else "cpu" # Use GPU if available
start_time = time.time()

print("initializing model")
tts = TTS(
    model_path="./minimike",
    config_path="./minimike/config.json"
).to(device)

print("synthesizing audio")
tts.tts_to_file(
    text=message,
    speaker_wav="./datasichael/wavs/001.wav",
    language="en",
    file_path="output_temp.wav"
)

print("resampling audio")
(
    ffmpeg
    .input('output_temp.wav')
    .output('output.wav', af='asetrate=24000,aresample=24000', ar='24000')
    .overwrite_output()
    .run(quiet=True) # remove quiet=True for ffmpeg output
)

os.remove("./output_temp.wav") # clean up temp file

end_time = time.time()
elapsed_time = end_time - start_time
print(f"request completed in: {elapsed_time:.2f} seconds")
