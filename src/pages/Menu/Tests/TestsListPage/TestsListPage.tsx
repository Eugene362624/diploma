import React, { useEffect, useState } from 'react'
import { Button, Card, List, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { testApi } from 'src/api/test'
import './TestsListPage.scss'

function TestsListPage() {
  const navigate = useNavigate()
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchTests = async () => {
    setLoading(true)
    const response = await testApi.getAll({ withDrafts: false })
    setTests(response)
    setTimeout(() => setLoading(false), 500)
  }

  useEffect(() => {
    fetchTests()
  }, [])

  return (
    <Card>
      <List
        loading={loading}
        header={<strong style={{ fontSize: '1.2rem' }}>Список тестов</strong>}
        dataSource={tests}
        renderItem={(item) => (
          <List.Item>
            <Row style={{ fontSize: '1rem' }} justify='space-between'>
              {item.name}{' '}
              <Button style={{ fontSize: '1rem' }} onClick={() => navigate(`../test/${item.id}`)}>
                Подробнее
              </Button>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  )
}

export default TestsListPage
