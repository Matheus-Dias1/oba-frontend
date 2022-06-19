import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { WindowAction } from './types';

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    frame: true,
    width: 1100,
    height: 700,
    backgroundColor: '#fff',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */

  ipcMain.on('windowAction', (_, action: WindowAction) => {
    if (mainWindow) {
      switch (action) {
        case WindowAction.CLOSE:
          mainWindow.close();
          break;
        case WindowAction.MAXIMIZE:
          mainWindow.maximize();
          break;
        case WindowAction.MINIMIZE:
          mainWindow.minimize();
          break;
        case WindowAction.RESTORE:
          mainWindow.restore();
          break;
      }
    }
  });
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/** gambiarra maxima */
const mainMenuTemplate = [
  {
    label: 'reload',
    click: () => {
      mainWindow?.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    },
  },
  {
    label: 'devtools',
    click: () => {
      mainWindow?.webContents.openDevTools();
    },
  },
];
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
Menu.setApplicationMenu(mainMenu);
