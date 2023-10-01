import { app, ipcMain } from 'electron'
import { Database } from '../../database'
import { config } from '../api.ipc'
import * as path from 'path'
import * as fs from 'fs'

export const registerAppModule = () => {
  ipcMain.once('close', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  ipcMain.handle('encrypt_db', async (_event, _data) => {
    try {
      await Database.encrypt()
      return { status: 'success' }
    } catch (error) {
      return {
        error: {
          message: 'Ошибка при попытке зашифровать данные',
          reason: (error as Error).message,
        },
      }
    }
  })

  ipcMain.handle('post_pdf', async (_event, data: any) => {
    try {
      const { file, filename } = data
      const base64Data = file.split(';base64,').pop()
      if (!base64Data) return

      const pdfBuffer = Buffer.from(base64Data, 'base64')

      if (!fs.existsSync(config.filesDir)) {
        fs.mkdirSync(config.filesDir)
      }

      const filePath = path.join(config.filesDir, filename)
      fs.writeFile(filePath, pdfBuffer, (response) => {
        console.log(response)
      })
      return true
    } catch (error) {
      return false
    }
  })

  ipcMain.handle('delete_pdf', async (_event, filename) => {
    try {
      fs.rmSync(path.join(config.filesDir, filename))
      return true
    } catch (error) {
      return false
    }
  })
}
