import React from 'react'
import { Outlet } from 'react-router-dom'
import './InteractiveLayout.scss'

function InteractiveLayout(): JSX.Element {
  return (
    <div className='interactive-layout'>
      <Outlet />
    </div>
  )
}

export default InteractiveLayout
