import { Button, Form, Input, Modal, Row, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { appApi } from 'src/api/app'
import { exerciseApi } from 'src/api/exercise'
import FileUploadField from 'src/components/FileUploadField/FileUpload'
import { MODAL_BUTTONS } from 'src/enums/modalButtons'
import { NOTIFICATIONS_STATUSES } from 'src/enums/notifications'

function AddNewExerciseModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [fileInfo, setFileInfo] = useState<{ filename: string; name: string }>(null)

  useEffect(() => {
    if (!isOpen) {
      setFileInfo(null)
    }
  }, [isOpen])

  const onFileChange = (filename: string) => {
    setFileInfo({ filename: filename, name: filename?.split('.pdf')[0] })
  }

  const handleCreateExerciseClick = async () => {
    await exerciseApi
      .create(fileInfo)
      .then((res) => {
        notification.success({
          message: NOTIFICATIONS_STATUSES.SUCCESS_TITLE,
          description: 'Практичиеский материал успешно добавлен',
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
      destroyOnClose
      onCancel={() => setIsOpen(false)}
      footer={
        <Row justify={'end'}>
          <Button
            onClick={() => handleCreateExerciseClick()}
            disabled={!fileInfo || fileInfo?.name.length < 3}
            type='primary'
          >
            {MODAL_BUTTONS.CONFIRM}
          </Button>
          <Button>{MODAL_BUTTONS.CLOSE}</Button>
        </Row>
      }
      open={isOpen}
      title='Добавление нового практического материала'
    >
      <FileUploadField onFileChange={onFileChange} />
      <Form style={{ marginTop: '1rem' }} layout='vertical'>
        <Form.Item label='Будущее название файла'>
          <Input
            onChange={(e) => setFileInfo((prev) => ({ ...prev, name: e.target.value }))}
            value={fileInfo?.name}
            disabled={!fileInfo}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddNewExerciseModal
