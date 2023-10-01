import { Button, Card, List, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { theoryApi } from 'src/api/theory'

function TheoryListPage() {
  // TODO add api request
  const [theoryList, setTheoryList] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchTheory = async () => {
    setLoading(true)
    await theoryApi.getAll().then((res) => setTheoryList(res))
    setTimeout(() => setLoading(false), 500)
  }

  useEffect(() => {
    fetchTheory()
  }, [])

  const navigate = useNavigate()
  return (
    <div>
      <Card>
        <List
          loading={loading}
          header={<strong style={{ fontSize: '1.2rem' }}>Список теоретических материалов</strong>}
          dataSource={theoryList}
          renderItem={(item) => (
            <List.Item>
              <Row style={{ fontSize: '1rem' }} justify='space-between'>
                {item.name}{' '}
                <Button
                  style={{ fontSize: '1rem' }}
                  onClick={() => navigate(`../theories/${item.id}`)}
                >
                  Открыть
                </Button>
              </Row>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

export const mockTheories = [
  {
    name: 'Высокотемпературное легирование',
    id: 3,
    fileName: 'Высокотемпературное легирование.pdf',
  },
  {
    name: 'Ионное легирование',
    id: 4,
    fileName: 'Ионное легирование.pdf',
  },
  {
    name: 'Окисление',
    id: 5,
    fileName: 'Окисление.pdf',
  },
  {
    name: 'Осаждение слоёв и покрытий',
    id: 6,
    fileName: 'Осаждение слоёв и покрытий.pdf',
  },
  {
    name: 'Травление',
    id: 7,
    fileName: 'Травление.pdf',
  },
  {
    name: 'Фотолитография',
    id: 8,
    fileName: 'Фотолитография.pdf',
  },
  {
    name: 'Эпитаксия',
    id: 9,
    fileName: 'Эпитаксия.pdf',
  },
]

export default TheoryListPage
