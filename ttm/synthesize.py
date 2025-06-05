import torch
from TTS.api import TTS
import ffmpeg
import os

import time
start_time = time.time()


# Get device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Initialize TTS
tts = TTS(
    model_path="./minimike",
    config_path="./minimike/config.json"
).to(device)

# Synthesize audio
tts.tts_to_file(
    text="Testing123",
    speaker_wav="./datasichael/wavs/001.wav",
    language="en",
    file_path="output_temp.wav"
)

# Fix pitch/speed using ffmpeg-python
(
    ffmpeg
    .input('output_temp.wav')
    .output('output.wav', af='asetrate=24000,aresample=24000', ar='24000')
    .overwrite_output()
    .run()
)

os.remove("./output_temp.wav")

print("Fixed audio saved as output_fixed.wav")

end_time = time.time()
elapsed_time = end_time - start_time
print(f"Id done took: {elapsed_time:.2f} seconds")

