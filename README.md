# discord-js-v13-24-7-radio-example
Discord.Js v13 24/7 Radio Example

**Installation**

Node v16.9.0 or higher.

```
npm install discord.js
npm install @discordjs/voice
npm install @discordjs/opus
npm install ytdl-core
npm install ffmpeg-static
npm install sodium

sudo chmod +x radio.sh
sudo nano /etc/systemd/system/radio.service

[Unit]
Description=radio
After=network.target
[Service]
WorkingDirectory=/home/radio
User=radio
Group=radio
Type=simple
ExecStart=/home/radio/radio.sh
RestartSec=15
Restart=always
[Install]
WantedBy=multi-user.target
```
