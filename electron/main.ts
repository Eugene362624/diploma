import { BrowserWindow, app } from 'electron'
import { createAppWindow } from './appWindow'
import { Database } from './database'

app.on('ready', () => {
  createAppWindow()
  Database.init()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createAppWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
