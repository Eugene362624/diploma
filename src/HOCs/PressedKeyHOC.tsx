import React, { createContext, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

export const PressedKeyContext = createContext(null)

function PressedKeyHOC({ children }: Props) {
  const [pressedKey, setPressedKey] = useState<string[]>([])
  const location = useLocation()
  const onKeyDownHandler = useCallback((event: KeyboardEvent) => {
    setPressedKey([event.key])
  }, [])

  useEffect(() => {
    if (pressedKey.length !== 0) {
      console.log('Pressed key:', ...pressedKey)
      setTimeout(() => setPressedKey([]), 1)
    }
  }, [pressedKey])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDownHandler)
    return () => {
      window.removeEventListener('keydown', onKeyDownHandler)
    }
  }, [onKeyDownHandler])

  useEffect(() => {
    setPressedKey([])
  }, [location])

  return <PressedKeyContext.Provider value={pressedKey}>{children}</PressedKeyContext.Provider>
}

export default PressedKeyHOC
