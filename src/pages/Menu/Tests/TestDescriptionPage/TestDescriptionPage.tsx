import React, { useContext, useEffect, useRef, useState } from 'react'
import './TestDescriptionPage.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Typography } from 'antd'
import Test, { IQuestion } from './components/Test/Test'
import { testApi } from 'src/api/test'
import { PressedKeyContext } from 'src/HOCs/PressedKeyHOC'

function TestDescriptionPage() {
  const params = useParams()
  const navigate = useNavigate()
  const [isTestStarted, setIsTestStarted] = useState(false)
  const [questions, setQuestions] = useState<IQuestion[] | []>([])
  const [test, setTest] = useState<{ name: string; id: string; isDraft: boolean }>({
    name: '',
    isDraft: false,
    id: '',
  })
  const pressedKey = useContext(PressedKeyContext)
  const startButtonRef = useRef<HTMLButtonElement>(null)

  const getTest = async () => {
    const paramsId = params.id
    testApi.getById(paramsId).then((res) => {
      setTest({ name: res.name, id: res.id, isDraft: res.isDraft })
      setQuestions(res?.questions)
    })
  }

  useEffect(() => {
    if (params.id) {
      getTest()
    }
  }, [params])

  useEffect(() => {
    if (pressedKey[0] === 'Enter' && startButtonRef.current !== null) {
      startButtonRef.current.click()
    }
  }, [pressedKey])

  return isTestStarted ? (
    <Test
      questions={questions}
      test={test}
      isTestStarted={isTestStarted}
      setIsTestStarted={setIsTestStarted}
    ></Test>
  ) : (
    <>
      <Button className='left-top' onClick={() => navigate(-1)}>
        Назад
      </Button>
      <Button className='right-top' type='dashed' onClick={() => navigate('/theory')}>
        Перейти к теории
      </Button>
      <div className='interactive-layout__description'>
        <Typography.Paragraph>
          <strong>Название</strong>: {test ? test.name : ''}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <strong>Количество вопросов</strong>: {questions?.length}
        </Typography.Paragraph>
        <Typography.Paragraph>
          <strong>Время на выполнение</strong>: неограничено
        </Typography.Paragraph>
        <Typography.Paragraph>
          <strong>Для зачёта</strong>: необходимо ответить на все вопросы верно
        </Typography.Paragraph>
        <Button
          disabled={test?.isDraft || questions?.length === 0}
          ref={startButtonRef}
          type='primary'
          onClick={() => setIsTestStarted(true)}
        >
          Начать тест
        </Button>
      </div>
    </>
  )
}

export default TestDescriptionPage
