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
    })
})
