import React, { useEffect, useState } from 'react'
import './Sidebar.scss'
import Logo from '../../assets/images/icon.png'
import { Button, Modal, QRCode, Tooltip } from 'antd'
import { BiExit } from 'react-icons/bi'
import { BsArrowBarLeft } from 'react-icons/bs'
import { AiFillSetting, AiFillHome, AiOutlineAreaChart } from 'react-icons/ai'
import { IoLibrarySharp } from 'react-icons/io5'
import { HiOutlineCalculator } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import confirm from 'antd/es/modal/confirm'
import { InfoCircleFilled } from '@ant-design/icons'

const Sidebar = (): JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const [isExitModalOpen, setIsExitModalOpen] = useState(false)

  const showExitModal = () => {
    setIsExitModalOpen(true)
  }

  const handleExitModalOk = () => {
    setIsExitModalOpen(false)
    window.api.send('close', {})
  }

  const handleExitModalCancel = () => {
    setIsExitModalOpen(false)
  }

  return (
    <div className={'sidebar__wrapper' + (isSidebarOpen ? ' sidebar__wrapper_open' : '')}>
      <div className='sidebar__top'>
        <img
          onClick={() => {
            confirm({
              icon: <InfoCircleFilled rev={''} style={{ color: '#1677FF' }} />,
              title: 'Разработчик',
              content: (
                <div className='developer-modal__body'>
                  <QRCode value={'https://github.com/Eugene362624'} />
                  <QRCode value={'https://www.linkedin.com/in/yauhenimiadzvedzeu/'} />
                </div>
              ),
              okText: 'Понятно',
            })
          }}
          src={Logo}
          alt=''
        />
        <div className='sidebar__top__appname-wrapper'>
          <span>Кафедра микро-</span>
          <span>и наноэлектроники</span>
        </div>
      </div>
      <SidebarMenu />
      <Button
        shape='circle'
        onClick={() => {
          setIsSidebarOpen((prev) => !prev)
        }}
        className={
          'sidebar__hide-button' + (!isSidebarOpen ? ' sidebar__hide-button_inverted' : '')
        }
        icon={<BsArrowBarLeft />}
      ></Button>
      <div className='sidebar__bottom'>
        <Tooltip placement='right' title='Выйти из приложения'>
          <Button className='sidebar__exit-button' onClick={showExitModal} icon={<BiExit />}>
            {isSidebarOpen ? 'Закрыть' : ''}
          </Button>
        </Tooltip>
      </div>
      <Modal
        title='Уже уходите?'
        open={isExitModalOpen}
        onOk={handleExitModalOk}
        onCancel={handleExitModalCancel}
        cancelText={'Нет'}
        okText={'Да'}
      >
        <p>Вы действительно хотите закрыть приложение?</p>
      </Modal>
    </div>
  )
}

const SidebarMenu = () => {
  return (
    <div className='sidebar__menu'>
      <nav>
        <NavLink
          className={({ isActive }) => 'sidebar__link' + (isActive ? ' sidebar__link_active' : '')}
          to={'/'}
        >
          <AiFillHome /> <span>Главная</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => 'sidebar__link' + (isActive ? ' sidebar__link_active' : '')}
          to={'/theory'}
        >
          <IoLibrarySharp /> <span>Теория</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => 'sidebar__link' + (isActive ? ' sidebar__link_active' : '')}
          to={'/tests'}
        >
          <AiOutlineAreaChart /> <span>Тесты</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => 'sidebar__link' + (isActive ? ' sidebar__link_active' : '')}
          to={'/exercises'}
        >
          <HiOutlineCalculator /> <span>Практическая часть</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => 'sidebar__link' + (isActive ? ' sidebar__link_active' : '')}
          to={'/settings'}
        >
          <AiFillSetting /> <span>Настройки</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
