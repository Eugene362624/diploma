import { Button, Form, Input, Modal, Row, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { appApi } from 'src/api/app'
import { theoryApi } from 'src/api/theory'
import { MODAL_BUTTONS } from 'src/enums/modalButtons'
import { NOTIFICATIONS_STATUSES } from 'src/enums/notifications'

type Props = {
  isOpen: boolean
  openedTheoryId: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  theoryList: any
}

function EditTheoryModal({ isOpen, setIsOpen, openedTheoryId, theoryList }: Props) {
  const [editedName, setEditedName] = useState<string>('')

  useEffect(() => {
    setEditedName(theoryList?.find((e: any) => e.id === openedTheoryId)?.name)
  }, [isOpen, openedTheoryId])

  const handleUpdateTheoryClick = async () => {
    await theoryApi
      .update({ id: openedTheoryId, name: editedName })
      .then((res) => {
        notification.success({
          message: NOTIFICATIONS_STATUSES.SUCCESS_TITLE,
          description: 'Теоретический материал успешно обновлён',
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
    await theoryApi
      .delete(openedTheoryId)
      .then((res) => {
        notification.success({
          message: NOTIFICATIONS_STATUSES.SUCCESS_TITLE,
          description: 'Теоретический материал успешно удалён',
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
          <Button onClick={() => handleUpdateTheoryClick()} type='primary'>
            {MODAL_BUTTONS.CONFIRM}
          </Button>
          <Button onClick={() => setIsOpen(false)}>{MODAL_BUTTONS.CLOSE}</Button>
        </Row>
      }
    >
      <Form layout='vertical'>
        <Form.Item>
          <Button.Group>
            <Button onClick={() => handleDeleteClick()} icon={<AiFillDelete />}></Button>
          </Button.Group>
        </Form.Item>
        <Form.Item label='Имя файла'>
          <Input onChange={(e) => setEditedName(e.target.value)} value={editedName}></Input>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditTheoryModal
