import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLDivElement)
root.render(<App />)

declare global {
  interface Window {
    api: {
      send: (channel: string, data: any) => any
      receive: (channel: string, callback: (response: any) => void) => any
      removeListener: (channel: string) => void
      invoke: (method: string, data: object) => Promise<any>
    }
  }
}
