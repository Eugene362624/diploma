import React, { useEffect, useState } from 'react'
import './SearchBar.scss'
import { Button, Card, Col, Input, List, Modal, Popover, Row } from 'antd'
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi'
import { AiOutlineSearch } from 'react-icons/ai'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'))
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format('HH:mm'))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <></>
    // <Card className='searchbar__wrapper'>
    //   <div className='searchbar__content'>
    //     <div className='searchbar__content-left'>
    //       <Button.Group>
    //         <Button onClick={() => navigate(-1)} icon={<HiOutlineArrowSmLeft />}></Button>
    //         <Button onClick={() => navigate(1)} icon={<HiOutlineArrowSmRight />}></Button>
    //       </Button.Group>
    //       {/* <Popover
    //         placement='bottomLeft'
    //         title={'Результаты поиска'}
    //         content={<List bordered></List>}
    //         open={isSearchPopoverOpen}
    //         onOpenChange={setIsSearchPopoverOpen}
    //       >
    //         <Input
    //           placeholder='Поиск'
    //           className='searchbar'
    //           onInput={() => setIsSearchPopoverOpen(true)}
    //           prefix={<AiOutlineSearch />}
    //         ></Input>
    //       </Popover> */}
    //     </div>
    //     <div className='searchbar__content-right'>
    //       {/* <p>
    //         <strong>Сегодня</strong>: {moment(new Date()).format("DD.MM.YYYY")},{" "}
    //         <strong>Время</strong>: {currentTime}
    //       </p> */}
    //     </div>
    //   </div>
    // </Card>
  )
}

export default SearchBar
