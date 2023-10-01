import { Button, Card, Divider, List, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { exerciseApi } from 'src/api/exercise'
import AddNewExerciseModal from './components/AddNewExerciseModal'
import EditExerciseModal from './components/EditExerciseModal'

function EditExercisesPage() {
  const [isAddNewExerciseModalOpen, setIsAddNewExerciseModalOpen] = useState(false)
  const [isEditExerciseModalOpen, setIsEditExerciseModalOpen] = useState(false)
  const [openedExerciseId, setOpenedExerciseId] = useState<string>(null)
  const [exercisesList, setExercisesList] = useState([])

  const fetchExercises = async () => {
    const exercisesList = await exerciseApi.getAll()
    setExercisesList(exercisesList)
  }

  useEffect(() => {
    fetchExercises()
  }, [isAddNewExerciseModalOpen, isEditExerciseModalOpen])

  return (
    <Card className='edit-exercises-page__wrapper'>
      <Divider orientation='left'>Список практических материалов</Divider>
      <AddNewExerciseModal
        setIsOpen={setIsAddNewExerciseModalOpen}
        isOpen={isAddNewExerciseModalOpen}
      />
      <EditExerciseModal
        exercisesList={exercisesList}
        openedExerciseId={openedExerciseId}
        setIsOpen={setIsEditExerciseModalOpen}
        isOpen={isEditExerciseModalOpen}
      />
      <List
        dataSource={exercisesList}
        renderItem={(item) => (
          <List.Item>
            <Row justify='space-between'>
              {item.name}
              <Button
                onClick={() => {
                  setIsEditExerciseModalOpen(true)
                  setOpenedExerciseId(item.id)
                }}
              >
                Редактировать
              </Button>
            </Row>
          </List.Item>
        )}
        footer={
          <Button onClick={() => setIsAddNewExerciseModalOpen(true)} block>
            Добавить новый
          </Button>
        }
      ></List>
    </Card>
  )
}

export default EditExercisesPage
