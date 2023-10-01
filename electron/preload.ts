import { contextBridge, ipcRenderer } from 'electron'
import { IQuestion, ITest } from './interfaces'

const api = {
  // function for sending messages to the main process via IPC
  send: (channel: string, data: any) => {
    ipcRenderer.send(channel, data)
  },
  // function for receiving messages from the main process via IPC
  receive: (channel: string, func: any) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args))
  },
  // function for clearing listeners
  removeListener: (channel: string) => {
    ipcRenderer.removeAllListeners(channel)
  },
  invoke: (method: string, data: object): Promise<any> => {
    return ipcRenderer.invoke(method, data)
  },
}

contextBridge.exposeInMainWorld('api', api)
