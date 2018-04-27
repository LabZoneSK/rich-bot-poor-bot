const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron');

const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

const bot = require('./app/bot');

let mainWindow;

global.sharedObj = {
  bot
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false
    }
  });

  setTimeout(() => {
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }, 2000);

  if(isDev) {
    mainWindow.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  })
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
