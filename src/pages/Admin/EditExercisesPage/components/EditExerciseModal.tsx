import { Button, Form, Input, Modal, Row, Tooltip, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { appApi } from 'src/api/app'
import { exerciseApi } from 'src/api/exercise'
import { MODAL_BUTTONS } from 'src/enums/modalButtons'
import { NOTIFICATIONS_STATUSES } from 'src/enums/notifications'

type Props = {
  isOpen: boolean
  openedExerciseId: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  exercisesList: any
}

function EditExerciseModal({ isOpen, setIsOpen, openedExerciseId, exercisesList }: Props) {
  const [editedName, setEditedName] = useState<string>('')

  useEffect(() => {
    setEditedName(exercisesList?.find((e: any) => e.id === openedExerciseId)?.name)
  }, [isOpen, openedExerciseId])

  const handleUpdateExerciseClick = async () => {
    await exerciseApi
      .update({ id: openedExerciseId, name: editedName })
      .then((res) => {
        notification.success({
          message: NOTIFICATIONS_STATUSES.SUCCESS_TITLE,
          description: 'Практичиеский материал успешно обновлён',
        })
        setIsOpen(false)
      })
      .catch((err) =>
        notification.error({
          message: NOTIFICATIONS_STATUSES.ERROR_TITLE,
          description: JSON.stringify(err),
        }),
      )
    await appApi
      .encryptDb()
      .then(() => {
        notification.success({
          message: NOTIFICATIONS_STATUSES.SUCCESS_TITLE,
          description: 'База данных успешно обновлена!',
        })
      })
      .catch((err) =>
        notification.error({
          message: NOTIFICATIONS_STATUSES.ERROR_TITLE,
          description: JSON.stringify(err),
        }),
      )
  }

  const handleDeleteClick = async () => {
    await exerciseApi
      .delete(openedExerciseId)
      .then((res) => {
        notification.success({
          message: NOTIFICATIONS_STATUSES.SUCCESS_TITLE,
          description: 'Практичиеский материал успешно удалён',
        })
        setIsOpen(false)
      })
      .catch((err) =>
        notification.error({
          message: NOTIFICATIONS_STATUSES.ERROR_TITLE,
          description: JSON.stringify(err),
        }),
      )
    await appApi
      .encryptDb()
      .then(() => {
        notification.success({
          message: NOTIFICATIONS_STATUSES.SUCCESS_TITLE,
          description: 'База данных успешно обновлена!',
        })
      })
      .catch((err) =>
        notification.error({
          message: NOTIFICATIONS_STATUSES.ERROR_TITLE,
          description: JSON.stringify(err),
        }),
      )
  }

  return (
    <Modal
      title='Редактирование практического материала'
      onCancel={() => setIsOpen(false)}
      open={isOpen}
      footer={
        <Row justify={'end'}>
          <Button onClick={() => handleUpdateExerciseClick()} type='primary'>
            {MODAL_BUTTONS.CONFIRM}
          </Button>
          <Button onClick={() => setIsOpen(false)}>{MODAL_BUTTONS.CLOSE}</Button>
        </Row>
      }
    >
      <Form layout='vertical'>
        <Form.Item>
          <Button.Group>
            <Tooltip title='Удалить файл'>
              <Button onClick={() => handleDeleteClick()} icon={<AiFillDelete />}></Button>
            </Tooltip>
          </Button.Group>
        </Form.Item>
        <Form.Item label='Имя файла'>
          <Input onChange={(e) => setEditedName(e.target.value)} value={editedName}></Input>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditExerciseModal
