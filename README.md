# Raspberry / Orange Pi Signage 
This is a little installation 

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
And now whe have to make the autorun.sh

```bash
vi /home/pi/autorun.sh
```
Copy/Paste or type :
```bash
#!/sbin/bash
while true
do
/home/pi/Electron/electron --display=:0 /home/pi/display
sleep 5
done
```
now make the package.json in /home/pi/display
```bash
vi /home/pi/display/package.json
```
copy/past the folowing lines.

```json
{
  "name": "smartDisplay",
  "version": "1.0.0",
  "description": "Simple and Quick singage display",
  "repository": "electron/s",
  "main": "app.js",
  "scripts": {
    "start": "electron app.js"
  },
  "license": "ISC",
  "devDependencies": {
    "electron": "^1.4.12"
  }
}
```
The next step is to make the app.js the 'engine for Electron' 
```bash
vi /home/pi/display/app.js
```
copy/paste the folowing lines and adjust your screensize (width and height) in this version it's 1920 x 1080
```JavaScript
var electron = require('electron') // http://electron.atom.io/docs/api
var path = require('path') // https://nodejs.org/api/path.html
var url = require('url') // https://nodejs.org/api/url.html
var window = null
const { exec } = require('child_process');

electron.app.setPath('userData', __dirname + '/data');

electron.app.once('ready', function () {
    window = new electron.BrowserWindow({
        allowRunningInsecureContent: true,
        width: 1920,
        height: 1080,
        backgroundColor: "#000000",
        show: false,
        frame: false
    });

    window.loadURL('file://' + __dirname + '/index.html');

    window.on('closed', function () {
        window = null;
        electron.app.quit();
    });

    window.once('ready-to-show', function () {
        window.setMenuBarVisibility(false);
        window.show()
	exec("sudo killall -9 omxplayer.bin");
    })
})
```
At this point you have to put the webcontent you wish to display in /home/pi/display with default starting point index.html. 

Your imagination and knowledge about HTML5/CSS/JavaScript is the limit ;-) 




