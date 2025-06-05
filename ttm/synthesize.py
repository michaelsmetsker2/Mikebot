import torch
from TTS.api import TTS
import ffmpeg
import os

# Get device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Initialize TTS
tts = TTS(
    model_path="./minimike",
    config_path="./minimike/config.json"
).to(device)

# Synthesize audio
tts.tts_to_file(
    text="Your kinda bein a diddy blud",
    speaker_wav="./minimike/001.wav",
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
