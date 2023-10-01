import { UploadFile } from 'antd'
import { APP_IPC_METHODS } from './enums'
import { ipcManager } from './ipcManager'

class AppApi {
  public async encryptDb(): Promise<{ status: string }> {
    return await ipcManager.invoke(APP_IPC_METHODS.ENCRYPT_DB, {})
  }

  public async addPdf({ filename, file }: any) {
    return await ipcManager.invoke(APP_IPC_METHODS.ADD_PDF, { filename: filename, file: file })
  }

  public async deletePdf(filename: string) {
    return await ipcManager.invoke(APP_IPC_METHODS.DELETE_PDF, filename)
  }
}

export const appApi = new AppApi()
