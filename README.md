## Mikebot
A discord bot for Michaels from Michaels

i cant imagine anyone else practically getting this project to work in full, it is geared toward my specific setup, however i beleive that some parts of it are cool and/or i am proud of them therefore i am sharing it. All the file paths would need to changed.

currently the activity stuff is all defunct

## Commands
- /annoy [message] prints the text to a file that will be read out by a modified willfromafar frontend and played from my speaker
- /query is an 8ball that sends a wav file of your tts answer (all responses are stored in responses.txt)
    this will aslso trigger from @ mentioning the bot
- /ttm [message] Responds to the message with a wav file of my voice with ai text to speech

## Installation
tested with python 3.12 on linux

```bash
cit clone https://github.com/michaelsmetsker2/Mikebot.git
sudo apt install ffmpeg
pip install TTS

cd ./Mikebot/bot
npm install discord.js
```
add a .env file in the main directory and include the following

for the query and annoy commands to work, a seperate external tts engine must look in the
temp folder for file updates, tts.txt for /annoy and query.txt for /query
then for /query it will put a wav file called queryOutput.wav in the same temp directory
all file names are configurable in the applicable command js file.

for this i use a modified vesion of [WillfromAfar reupload](https://archive.org/details/willfromafar-repack)
the modified exe is included as MicapelaFrontend but dlls and other required files must be downloaded from the link. To update file paths use a program like dnspy to edit the exe, functions i added are in AcapelaGroup.PronuniationEditor/PEWindow.
    Note: I could not get this program to run on so i use a seperate windows vm. (it prolly can im just dumb)

Also included is the raw wav files used to train the voice model, the transcript csv for, and the training script for ttm. 
The model itself is not included as the filesize is to large, but i can distribute it on request.

if you want to train a model the full [coqui-tts community maintained repo must be cloned](https://github.com/idiap/coqui-ai-TTS/tree/dev) and the filepaths in the train script should be updated. I found around 6000 itterations was sufficient before the "imperfections" of my recordings started screwing things up.