import { Button, Card, List, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { exerciseApi } from 'src/api/exercise'

function ExercisesListPage() {
  const navigate = useNavigate()
  const [exercisesList, setExercisesList] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchExercises = async () => {
    setLoading(true)
    await exerciseApi.getAll().then(setExercisesList)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  useEffect(() => {
    fetchExercises()
  }, [])
  return (
    <div>
      <Card>
        <List
          loading={loading}
          header={<strong style={{ fontSize: '1.2rem' }}>Список расчётных задач</strong>}
          dataSource={exercisesList}
          renderItem={(item) => (
            <List.Item>
              <Row style={{ fontSize: '1rem' }} justify='space-between'>
                {item.name}{' '}
                <Button
                  style={{ fontSize: '1rem' }}
                  onClick={() => navigate(`../exercise/${item.id}`)}
                >
                  Открыть
                </Button>
              </Row>
            </List.Item>
          )}
        ></List>
      </Card>
    </div>
  )
}

export const mockExercises = [
  {
    id: 4,
    name: 'Высокотемпературное легирование',
    fileName: 'типовой расчёт_диффузия.pdf',
  },
  {
    id: 5,
    name: 'Пример оформления отчёта №1',
    fileName: 'пример оформления отчёта 1.pdf',
  },
  {
    id: 2,
    name: 'Окисление',
    fileName: 'окисление_расчёт.pdf',
  },
  {
    id: 3,
    name: 'Ионное легирование',
    fileName: 'типовой расчёт_имплантация.pdf',
  },
  {
    id: 6,
    name: 'Пример оформления отчёта №2',
    fileName: 'пример оформления отчёта 2.pdf',
  },
  {
    id: 1,
    name: 'Осаждение',
    fileName: 'распыление_расчёт.pdf',
  },
]

export default ExercisesListPage
