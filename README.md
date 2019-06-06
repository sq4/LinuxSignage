# Raspberry Pi / Orange Pi Signage 
This is a little installation instruction to turn Rasberry Pi / Orange Pi into a graphical display.

I'ts based on HTML5/CSS/JavaScript 
Your imagination and knowledge about HTML5/CSS/JavaScript is the limit ;-) 

i'ts also a good base for interactive screens, like photo-booth, mp3 jukebox, etc.

### Installing Xorg bare X 
```bash
sudo apt install -y --no-install-recommends xserver-xorg xserver-xorg-input-evdev 
```
### Download and extract Electron latest version at (05-04-2019) 

```bash
cd ~
wget https://github.com/electron/electron/releases/download/v5.0.2/electron-v5.0.2-linux-armv7l.zip
mkdir Electron
cd Electron
unzip ../electron-v5.0.2-linux-armv7l.zip
```
### Installing the dependencies for Electron
```bash
sudo apt install -y --no-install-recommends libnss3 libgtkextra-dev libgtk-3-0 libxtst-dev libxss1 
```
for other linux distro's then the Armbian and Raspbian. You can use this link to find the version you need for your hardware / distro. 

https://github.com/electron/electron/releases/tag/v5.0.2

### /etc/rc.local (To start the X and Electron)
open your favorite Editor to make some changes to /etc/rc.local in my case i love vi.

```bash
sudo vi /etc/rc.local
```
and add the folowing lines befor the exit 0 line and save the file.
```bash
Xorg -s 0 -quiet -nocursor &
sudo -u pi /home/pi/autorun.sh >/home/pi/auto.log 2>&1 &
```

if you need the mousepointer then remove -nocursor from the Xorg line.

copy the autorun.sh file from this github to /home/pi/
and change the executable bit. 
```bash
chmod +x autorun.sh
```

Make a folder in your /home/pi with the name display, in this folder you have to put your own webcontent wich you wish to display.

```bash
mkdir /home/pi/display
```
copy package.json and app.json into /home/pi/display.
change the resolution to fit your display in app.js (lines 12 and 13) so the page would be fit neatly. 

### Final

copy the index.html / style.css / images etc. from your HTML5 project into /home/pi/display.

after a reboot your html page sould appear. 




