import { Button, Form, Input, Modal, Row, Tooltip, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { MODAL_BUTTONS } from '../../../../enums/modalButtons'
import TestQuestions from './TestQuestions'
import TestQuestionModal, { ITestInfo } from './TestQuestionModal'
import { testApi } from 'src/api/test'
import { appApi } from 'src/api/app'
import ButtonGroup from 'antd/es/button/button-group'
import { AiFillDelete, AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { NOTIFICATIONS_STATUSES } from 'src/enums/notifications'
import { IoBook } from 'react-icons/io5'
import FileUploadField from 'src/components/FileUploadField/FileUpload'

type Props = {
  isTestModalOpen: boolean
  setIsTestModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditingTestId: React.Dispatch<React.SetStateAction<string>>
  editingTestId: string
}
const getInitialState = () => {
  const testId = crypto.randomUUID()
  const questionId = crypto.randomUUID()
  return {
    id: testId,
    name: 'Новый тест',
    isDraft: true,
    questions: [
      {
        id: questionId,
        testId: testId,
        title: 'Новый вопрос',
        answers: [
          {
            id: crypto.randomUUID(),
            title: 'Новый ответ',
            isCorrect: false,
            questionId: questionId,
          },
        ],
      },
    ],
  }
}

function TestModal({
  isTestModalOpen,
  setIsTestModalOpen,
  editingTestId,
  setEditingTestId,
}: Props) {
  const [testInfo, setTestInfo] = useState<ITestInfo>(null)
  const [openedQuestionId, setOpenedQuestionId] = useState<string>(null)
  const [editedTestInfo, setEditedTestInfo] = useState<ITestInfo>(null)
  const [isTestTheoryModalOpen, setIsTestTheoryModalOpen] = useState<boolean>(false)

  useEffect(() => {
    // if closed, state reload
    if (!isTestModalOpen) {
      setTestInfo(null)
      setEditedTestInfo(null)
      setOpenedQuestionId(null)
      setEditingTestId(null)
      // if test id, do api call
    } else if (editingTestId) {
      testApi.getById(editingTestId).then((res) => {
        setTestInfo(res)
        setEditedTestInfo(res)
      })
      // if test new, receive initial state
    } else if (!editingTestId && isTestModalOpen) {
      setTestInfo(getInitialState())
      setEditedTestInfo(getInitialState())
    }
  }, [isTestModalOpen])

  const handleIsDraftToggle = async () => {
    setEditedTestInfo((prev) => ({ ...prev, isDraft: !prev.isDraft }))
  }

  const deleteTest = () => {
    Modal.confirm({
      title: 'Подтвердите действие',
      content: `Вы действительно хотите удалить тест под названием "${testInfo?.name}"?`,
      cancelText: MODAL_BUTTONS.NO,
      okText: MODAL_BUTTONS.YES,
      async onOk() {
        await testApi
          .delete(testInfo.id)
          .then(() => {
            notification.success({
              message: NOTIFICATIONS_STATUSES.SUCCESS_TITLE,
              description: 'Тест успешно удалён!',
            })
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
        setIsTestModalOpen(false)
      },
      onCancel() {
        console.log('!!!')
      },
    })
  }

  const addNewQuestion = () => {
    const questionId = crypto.randomUUID()
    setEditedTestInfo((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          title: 'Новый вопрос',
          id: questionId,
          testId: prev.id,
          answers: [
            {
              id: crypto.randomUUID(),
              title: 'Новый ответ',
              isCorrect: false,
              questionId: questionId,
            },
          ],
        },
      ],
    }))
  }

  const handleDeleteQuestionClick = (questionId: string) => {
    setTestInfo((prev) => ({
      ...prev,
      questions: prev.questions.filter((question) => question.id !== questionId),
    }))
    setEditedTestInfo((prev) => ({
      ...prev,
      questions: prev.questions.filter((question) => question.id !== questionId),
    }))
  }

  const handleCreateTestClick = async () => {
    await testApi
      .create(editedTestInfo)
      .then(() =>
        notification.success({
          message: NOTIFICATIONS_STATUSES.SUCCESS_TITLE,
          description: 'Тест успешно создан!',
        }),
      )
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

  const handleUpdateTestClick = async () => {
    await testApi
      .updateOne({ id: testInfo.id, toUpdate: editedTestInfo })
      .then(() =>
        notification.success({
          message: NOTIFICATIONS_STATUSES.SUCCESS_TITLE,
          description: 'Тест успешно обновлён!',
        }),
      )
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

  const getModalFooter = () => {
    return (
      <Row justify={'end'}>
        <Button
          onClick={() => {
            editingTestId ? handleUpdateTestClick() : handleCreateTestClick()
          }}
          type='primary'
        >
          {MODAL_BUTTONS.CONFIRM}
        </Button>
        <Button onClick={() => setIsTestModalOpen(false)}>{MODAL_BUTTONS.CLOSE}</Button>
      </Row>
    )
  }

  return (
    <Modal
      destroyOnClose
      className='new-test__modal'
      title={editingTestId ? 'Редактирование теста' : 'Добавление нового теста'}
      open={isTestModalOpen}
      onCancel={() => setIsTestModalOpen(false)}
      footer={getModalFooter()}
    >
      {editingTestId ? (
        <ButtonGroup style={{ marginBottom: '1rem' }}>
          <Tooltip title='Удалить тест'>
            <Button onClick={() => deleteTest()} icon={<AiFillDelete />} />
          </Tooltip>
          {/* <Tooltip title='Приложить теорию'>
            <Button
              onClick={() => {
                setIsTestTheoryModalOpen(true)
              }}
              icon={<IoBook />}
            />
          </Tooltip> */}
          <Tooltip title={editedTestInfo?.isDraft ? 'Открыть тест' : 'Скрыть тест'}>
            <Button
              onClick={() => handleIsDraftToggle()}
              icon={editedTestInfo?.isDraft ? <AiFillLock /> : <AiFillUnlock />}
            />
          </Tooltip>
        </ButtonGroup>
      ) : (
        <></>
      )}
      <TestQuestionModal
        testInfo={testInfo}
        setTestInfo={setTestInfo}
        openedQuestionId={openedQuestionId}
        setOpenedQuestionId={setOpenedQuestionId}
        setEditedTestInfo={setEditedTestInfo}
        editedTestInfo={editedTestInfo}
      />
      {/* <Modal
        title='Прикрепление файлов к тесту'
        onCancel={() => setIsTestTheoryModalOpen(false)}
        open={isTestTheoryModalOpen}
      >
        <FileUploadField />
      </Modal> */}
      <Form layout='vertical'>
        <Form.Item label='Название теста'>
          <Input
            onChange={(e) => setEditedTestInfo((prev) => ({ ...prev, name: e.target.value }))}
            value={editedTestInfo?.name}
          />
        </Form.Item>
        <TestQuestions
          setOpenedQuestionId={setOpenedQuestionId}
          questions={editedTestInfo?.questions}
          deleteQuestion={handleDeleteQuestionClick}
        />
        <Form.Item>
          <Button onClick={() => addNewQuestion()} type='default' block>
            Добавить вопрос
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TestModal
