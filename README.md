## Mikebot

A discord bot for Michaels from Michaels


## Commands
- /annoy [message] prints the text to a file that will be read out by a modified willfromafar frontent
- /query is an 8ball that sends a wav file of your tts answer (all responses are stored in responses.txt)
- /ttm [message] Respons to the message with a wav file of my voice with ai text to speech

ffmpeg
xvfb (if your running headless)
to install coqui tts dependencies:

## Installation
tested with python 3.12 on linux

```bash
cit clone https://github.com/michaelsmetsker2/Mikebot.git
sudo apt install ffmpeg
pip install TTS
```
add a .env file in the main directory and include the following
TOKEN=\<yourDiscordBotToken>
APP_ID=\<yourDiscordAppId>
TEMP_DIR=\<fullFilePathToATempDirectory>
ARCHIVE_DIR=\<fullFilePathToADirectoryToStoreTTSRecords>

for the query and annoy commands to work, a seperate external tts engine must look in the
temp folder for file updates, tts.txt for /annoy and query.txt for /query
then for /query it must put a wav file called queryOutput.wav in the same temp directory
all file names are configurable in the applicable command js file.

for this i use a modified vesion of [WillfromAfar reupload](https://archive.org/details/willfromafar-repack)
the modified exe is included as MicapelaFrontend but dlls and other required files must be downloaded from the link. To update file paths use a program like dnspy to edit the exe, functions i added are in AcapelaGroup.PronuniationEditor/PEWindow.
    Note: I could not get this program to run on wine. 

Also included is the raw wav files used to train the voice model, the transcript csv for, and the training script for ttm. 
The model itself is not included as the filesize is to large, but i can distribute it on request.

if you want to train a model the full [coqui-tts community maintained repo must be cloned](https://github.com/idiap/coqui-ai-TTS/tree/dev) and the filepaths in the train script should be updated. I found around 6000 itterations was sufficient before the "imperfections" of my recordings started screwing things up.