import SearchBar from '../components/SearchBar/SearchBar'
import Sidebar from '../components/Sidebar/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function MenuLayout() {
  return (
    <>
      <Sidebar></Sidebar>
      <div className='content__wrapper'>
        <SearchBar></SearchBar>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default MenuLayout
