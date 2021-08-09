const { 
  app, 
  BrowserWindow, 
  Menu, 
  shell, 
  Notification, 
  ipcMain,
  Tray,
  dialog
} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';
const isLinux = process.platform === 'linux';
const AppTrayLogoPath = path.join(__dirname, "../assets/icons/appIcon512.png");
const ApplicationName = "Todo App";

let MainWindow = null;
let LoadingWindow = null;
let AppTray = null;

const applicationDevelopmentMenuTemplate = [
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

const applicationMenuTemplate = [
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

const trayMenuTemplate = [
  { 
    label: 'Show App', 
    click: () => {
      MainWindow.show();
    } 
  },
  { 
    label: 'Quit', 
    click:  () => {
      const dialogOptions = {
        title: "Do you really want to close the app?",
        buttons: ["Yes", "Cancel"],
        message: "If you close the app, you won't get notifications of your todo list.",
      };
      dialog.showMessageBox(MainWindow, dialogOptions)
      .then(result => {
        if(result.response === 0){
          app.isQuiting = true;
          app.quit();
        }
      });
    }
  }
]

const ApplicationDevelopmentMenu = Menu.buildFromTemplate(applicationDevelopmentMenuTemplate);
const ApplicationMenu = Menu.buildFromTemplate(applicationMenuTemplate);
const TrayMenu = Menu.buildFromTemplate(trayMenuTemplate);

function LoadTray(){
  AppTray = new Tray(AppTrayLogoPath);
  AppTray.setToolTip(ApplicationName);
  AppTray.setContextMenu(TrayMenu);
}

function StartApplication(){
  LoadingWindow = new BrowserWindow({show: false, frame: false, transparent: true, center: true, width: 300, height: 350});
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
      }
    });
  
    MainWindow.on('minimize',function(event){
      event.preventDefault();
      MainWindow.hide();
    });
    
    MainWindow.on('close', function (event) {
      if(!app.isQuiting){
        event.preventDefault();
        MainWindow.hide();
      }
      return false;
    });

    MainWindow.webContents.once('dom-ready', () => {
      LoadingWindow.hide();
      MainWindow.show();
      LoadingWindow.close();
      LoadTray();
    });

    MainWindow.loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );
    
    if (isDev) {
      MainWindow.webContents.openDevTools({ mode: 'detach' });
      Menu.setApplicationMenu(ApplicationDevelopmentMenu);
    }else{
      Menu.setApplicationMenu(ApplicationMenu);
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

app.on('before-quit', () => {
  app.isQuiting = true;
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

ipcMain.on('alarmNotification', (_, notification) => {
  const NotificationOptions = {
    title: notification.title,
    subtitle: notification.subtitle,
    body: notification.body,
    icon: path.join(__dirname, '../assets/icons/notificationIcon.png'),
    urgency: 'critical',
    closeButtonText: 'Close Button',
    actions: [ {
        type: 'button',
        text: 'Show Button'
    }]
  };
  const notify = new Notification(NotificationOptions);
  notify.on('click', () =>{
    MainWindow.show();
  });
  notify.show();
})