import { Button, Card, Divider, Form, Input, List, Modal, Radio, Row, Select } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { testApi } from 'src/api/test'
import { theoryApi } from 'src/api/theory'
import FileUploadField from 'src/components/FileUploadField/FileUpload'
import { MODAL_BUTTONS } from 'src/enums/modalButtons'
import AddNewTheoryModal from './components/AddNewTheoryModal'
import EditTheoryModal from './components/EditTheoryModal'

function EditTheoryPage() {
  const [isAddNewTheoryModalOpen, setIsAddNewExerciseModalOpen] = useState<boolean>(false)
  const [editedTheory, setEditedTheory] = useState<{
    name: string
    testId: string
    groupId: number
  }>(null)
  const [theoryList, setTheoryList] = useState([])
  const [isEditTheoryModalOpen, setIsEditTestModalOpen] = useState<boolean>(false)
  const [openedTheoryId, setOpenedTheoryId] = useState<string>(null)

  const fetchTheory = async () => {
    const theory = await theoryApi.getAll()
    setTheoryList(theory)
  }

  const handleUpdateTheoryClick = async () => {
    theoryApi.update({ ...editedTheory, id: openedTheoryId }).then((res) => console.log(res))
  }

  useEffect(() => {
    if (openedTheoryId) {
      setEditedTheory(theoryList.find((e) => e.id === openedTheoryId))
    }
  }, [openedTheoryId])

  useEffect(() => {
    fetchTheory()
    if (!isEditTheoryModalOpen) {
      setEditedTheory(null)
      setOpenedTheoryId(null)
    }
  }, [isEditTheoryModalOpen, isAddNewTheoryModalOpen])

  return (
    <Card className='edit-theory-page__wrapper'>
      <Divider orientation='left'>Список теории</Divider>
      <AddNewTheoryModal
        setIsOpen={setIsAddNewExerciseModalOpen}
        isOpen={isAddNewTheoryModalOpen}
      />
      <EditTheoryModal
        isOpen={isEditTheoryModalOpen}
        setIsOpen={setIsEditTestModalOpen}
        theoryList={theoryList}
        openedTheoryId={openedTheoryId}
      />
      <List
        footer={
          <Button onClick={() => setIsAddNewExerciseModalOpen(true)} block>
            Добавить новую
          </Button>
        }
        dataSource={theoryList}
        renderItem={(item) => (
          <List.Item>
            <Row justify={'space-between'}>
              {item.name}
              <Button
                onClick={() => {
                  setIsEditTestModalOpen(true)
                  setOpenedTheoryId(item.id)
                }}
              >
                Редактировать
              </Button>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  )
}

export default EditTheoryPage
