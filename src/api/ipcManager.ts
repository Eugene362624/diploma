import { ALL_IPC_METHODS } from './enums'

class IpcManager {
  async invoke(channel: ALL_IPC_METHODS, data: any): Promise<any> {
    return await window.api.invoke(channel, data)
  }
}

export const ipcManager = new IpcManager()
