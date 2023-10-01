import React, { useEffect, useState } from 'react'
import { Card, List, Typography } from 'antd'
import { testApi } from 'src/api/test'
import { Link } from 'react-router-dom'
import './HomePage.scss'

function HomePage() {
  const [testsList, setTestsList] = useState([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchTests = async () => {
    setLoading(true)
    const response = await testApi.getAll({ withDrafts: false })
    setTestsList(response)
    setTimeout(() => setLoading(false), 500)
  }

  useEffect(() => {
    fetchTests()
  }, [])

  return (
    <div className='homepage__wrapper'>
      <div className='homepage__top homepage-element'>
        <Card>
          <Typography.Text style={{ fontSize: '20px' }}>
            <strong>Базовые технологические процессы микроэлектроники</strong>
          </Typography.Text>
        </Card>
      </div>
      <div className='homepage__bottom homepage-element'>
        <div className='homepage__bottom__content'>
          <List
            loading={loading}
            bordered
            dataSource={testsList}
            renderItem={(item) => (
              <List.Item>
                <Link
                  to={'test/' + item.id}
                  style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.88)' }}
                >
                  <strong>{item.name}</strong>
                </Link>
              </List.Item>
            )}
          />
        </div>
      </div>
      <Card>
        <p>Разработал Медведев Е.А. Научный руководитель Котов Д.А., Чернаусик О.М.</p>
      </Card>
    </div>
  )
}

export default HomePage
