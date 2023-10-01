import React, { createContext, useCallback, useEffect, useState } from 'react'
import './scss/global.scss'
import { HashRouter, useLocation } from 'react-router-dom'
import { AppRoutes } from './routes'
import PressedKeyHOC from './HOCs/PressedKeyHOC'

function App() {
  return (
    <HashRouter>
      <PressedKeyHOC>
        <AppRoutes />
      </PressedKeyHOC>
    </HashRouter>
  )
}

export default App
