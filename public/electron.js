const { 
  app, 
  BrowserWindow, 
  Menu, 
  shell, 
  Notification, 
  ipcMain 
} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const isMac = process.platform === 'darwin';

const menuTemplate = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const myMenuTemplate = [
  {
    label: "About",
    submenu:[
      {
        label: "Coder",
        click: async () =>{
          await shell.openExternal('https://www.linkedin.com/in/caner-s%C3%BCl%C3%BC%C5%9Fo%C4%9Flu-84b5b319b/')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(menuTemplate);

function StartApplication(){
  let MainWindow = null;
  let LoadingWindow = new BrowserWindow({show: false, frame: false, transparent: true, center: true, width: 300, height: 350});

  LoadingWindow.once('show', () => {
    MainWindow = new BrowserWindow({
      show: false,
      width: 1280,
      height: 720,
      minWidth: 800,
      minHeight: 600,
      resizable: true,
      movable: true,
      fullscreenable: true,
      webPreferences: {
        preload: path.join(__dirname, './preload.js'),
        contextIsolation: false,
        nodeIntegration: true
      },
    });
    Menu.setApplicationMenu(menu);
    MainWindow.webContents.once('dom-ready', () => {
      LoadingWindow.hide();
      MainWindow.show();
      LoadingWindow.close();
    });
    MainWindow.loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );
    if (isDev) {
      MainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  })
  LoadingWindow.loadURL(
    isDev
      ? `file://${path.join(__dirname, '../public/loading.html')}`
      : `file://${path.join(__dirname, '../build/loading.html')}`
  );
  LoadingWindow.show();
}

app.on('ready', StartApplication);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('notification', (_, notification) => {
  new Notification(notification).show();
})