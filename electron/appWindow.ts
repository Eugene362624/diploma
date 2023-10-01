import { BrowserWindow, app } from 'electron'
import path = require('path')
import { registerApiIpc } from './ipc/api.ipc'

let appWindow: BrowserWindow | null

export function createAppWindow(): BrowserWindow {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#202020',
    show: true,
    autoHideMenuBar: false,
    frame: true,
    title: 'БГУИР КМиНЭ',
    titleBarStyle: 'default',
    icon: path.resolve('assets/images/appIcon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
    },
  })

  app?.dock?.hide()

  // Load the index.html of the app window.
  if (app.isPackaged) {
    // 'build/index.html'
    appWindow.loadURL(`file://${__dirname}/../index.html`)
  } else {
    appWindow.loadURL('http://localhost:3000/index.html')

    appWindow.webContents.openDevTools()

    // Hot Reloading on 'node_modules/.bin/electronPath'

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('electron-reload')(__dirname, {
      electron: path.join(
        __dirname,
        '..',
        '..',
        'node_modules',
        '.bin',
        'electron' + (process.platform === 'win32' ? '.cmd' : ''),
      ),
      forceHardReset: true,
      hardResetMethod: 'exit',
    })
  }

  // Show window when its ready to
  appWindow.on('ready-to-show', () => (appWindow ? appWindow.show() : ''))

  // Register Inter Process Communication for main process
  registerIPC()

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null
    app.quit()
  })

  return appWindow
}

const registerIPC = () => {
  if (appWindow) {
    registerApiIpc()
  }
}
