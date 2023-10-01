import { Button, Form, Input, Modal, Row, Tooltip } from 'antd'
import React from 'react'
import { MODAL_BUTTONS } from '../../../../enums/modalButtons'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'

interface Props {
  setOpenedQuestionId: React.Dispatch<React.SetStateAction<string>>
  openedQuestionId: string
  setTestInfo: React.Dispatch<React.SetStateAction<ITestInfo>>
  testInfo: ITestInfo
  setEditedTestInfo: React.Dispatch<React.SetStateAction<ITestInfo>>
  editedTestInfo: ITestInfo
}

export interface ITestInfo {
  name: string
  id: string
  isDraft: boolean
  questions: {
    id: string
    title: string
    testId: string
    answers: { id: string; title: string; isCorrect: boolean; questionId: string }[]
  }[]
}

function TestQuestionModal({
  setOpenedQuestionId,
  openedQuestionId,
  testInfo,
  setTestInfo,
  setEditedTestInfo,
  editedTestInfo,
}: Props) {
  const currentQuestion = editedTestInfo?.questions?.find((e) => e.id === openedQuestionId)

  const handleQuestionTitleInput = (value: string) => {
    const updatedQuestions = editedTestInfo.questions.map((question) =>
      question.id === openedQuestionId ? { ...question, title: value } : question,
    )

    setEditedTestInfo((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

  const handleAddAnswer = () => {
    const newAnswerId = crypto.randomUUID()

    const updatedQuestions = editedTestInfo.questions.map((question) =>
      question.id === openedQuestionId
        ? {
            ...question,
            answers: [
              ...question.answers,
              {
                id: newAnswerId,
                title: 'Новый ответ',
                isCorrect: false,
                questionId: openedQuestionId,
              },
            ],
          }
        : question,
    )

    setEditedTestInfo((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

  const handleToggleAnswerCorrect = (answerId: string) => {
    const updatedQuestions = editedTestInfo.questions.map((question) =>
      question.id === openedQuestionId
        ? {
            ...question,
            answers: question.answers.map((answer) =>
              answer.id === answerId ? { ...answer, isCorrect: !answer.isCorrect } : answer,
            ),
          }
        : question,
    )

    setEditedTestInfo((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

  const handleDeleteAnswer = (answerId: string) => {
    const updatedQuestions = editedTestInfo.questions.map((question) =>
      question.id === openedQuestionId
        ? {
            ...question,
            answers: question.answers.filter((answer) => answer.id !== answerId),
          }
        : question,
    )

    setEditedTestInfo((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

  const setAnswerTitle = (answerId: string, newTitle: string) => {
    const updatedQuestions = editedTestInfo.questions.map((question) =>
      question.id === openedQuestionId
        ? {
            ...question,
            answers: question.answers.map((answer) =>
              answer.id === answerId ? { ...answer, title: newTitle } : answer,
            ),
          }
        : question,
    )
    setEditedTestInfo((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }))
  }

  return (
    <Modal
      destroyOnClose
      title='Редактирование вопроса'
      onCancel={() => setOpenedQuestionId(null)}
      footer={
        <Row justify={'end'}>
          <Button
            onClick={() => {
              setOpenedQuestionId(null)
            }}
            type='primary'
            disabled={
              editedTestInfo?.questions?.find((e) => e.id === currentQuestion?.id)?.answers
                ?.length < 2
            }
          >
            {MODAL_BUTTONS.CONFIRM}
          </Button>
          <Button
            onClick={() => {
              setOpenedQuestionId(null)
            }}
          >
            {MODAL_BUTTONS.CLOSE}
          </Button>
        </Row>
      }
      open={!!openedQuestionId}
    >
      <Form layout='vertical'>
        <Form.Item label='Название вопроса'>
          <Input
            onChange={(e) => handleQuestionTitleInput(e.target.value)}
            defaultValue={currentQuestion?.title}
          />
        </Form.Item>
        {editedTestInfo?.questions
          .find((e) => e.id === openedQuestionId)
          ?.answers?.map((answer, i) => (
            <Form.Item label={`Ответ ${i + 1}`} key={answer.id}>
              <Row justify={'space-between'}>
                <Input
                  onChange={(e) => setAnswerTitle(answer.id, e.target.value)}
                  value={answer.title}
                />
                <Row style={{ width: 'fit-content', minWidth: 'fit-content' }}>
                  <Tooltip title={answer.isCorrect ? 'Ответ верный' : 'Ответ неверный'}>
                    <Button
                      onClick={() => handleToggleAnswerCorrect(answer.id)}
                      icon={answer.isCorrect ? <BsToggleOn /> : <BsToggleOff />}
                    />
                  </Tooltip>
                  <Button onClick={() => handleDeleteAnswer(answer.id)} icon={<AiFillDelete />} />
                </Row>
              </Row>
            </Form.Item>
          ))}
        <Form.Item>
          <Button onClick={() => handleAddAnswer()} block>
            Добавить ответ
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TestQuestionModal
