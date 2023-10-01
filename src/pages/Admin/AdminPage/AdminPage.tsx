import { Button, Card } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import './AdminPage.scss'

function AdminPage() {
  return (
    <div className='adminpage__wrapper'>
      {adminLinks.map((e, i) => {
        return (
          <Card title={e.title} key={i}>
            <Link to={e.link}>
              <Button>Перейти</Button>
            </Link>
          </Card>
        )
      })}
    </div>
  )
}

const adminLinks = [
  {
    title: 'Редактирование тестов',
    link: 'tests',
  },
  {
    title: 'Редактирование теории',
    link: 'theory',
  },
  {
    title: 'Редактирование практики',
    link: 'exercises',
  },
]

export default AdminPage
