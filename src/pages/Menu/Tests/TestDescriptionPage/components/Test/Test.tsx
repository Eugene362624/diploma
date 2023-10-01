import { Button, Modal, Progress, Typography } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowForward, IoCloseOutline } from 'react-icons/io5'
import './Test.scss'
import { ITest } from 'src/interfaces/Test.interface'
import { shuffle } from 'src/helpers/shuffle'
import { PressedKeyContext } from 'src/HOCs/PressedKeyHOC'

type Props = {
  setIsTestStarted: React.Dispatch<React.SetStateAction<boolean>>
  isTestStarted: boolean
  questions: IQuestion[]
  test: ITest
}

export interface IQuestion {
  title: string
  testId: string
  id: string
  answers: { title: string; isCorrect: boolean; id: string; questionId: string }[]
}

function Test({ setIsTestStarted, isTestStarted, test, questions }: Props) {
  const [shuffledQuestions, setShuffledQuestions] = useState<IQuestion[] | []>([])
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [result, setResult] = useState<string[]>([])

  useEffect(() => {
    setShuffledQuestions(
      shuffle(questions).map((question) => ({ ...question, answers: shuffle(question.answers) })),
    )
  }, [questions])

  const pressedKey: Array<string> = useContext(PressedKeyContext)
  const leaveTestButtonRef = useRef<HTMLButtonElement>(null)
  const [modal, contextHolder] = Modal.useModal()
  const [progress, setProgress] = useState<number>(1)
  const [isTestEnded, setIsTestEnded] = useState<boolean>(false)
  const navigate = useNavigate()
  const params = useParams()

  const onKeyDownHandler = (e: string) => {
    const numberKeys = ['1', '2', '3', '4', '5', '6']
    if (e === 'Escape' && isTestStarted) {
      leaveTestButtonRef.current.click()
      return
    }
    // if (numberKeys.includes(e) && answers[+e - 1]) {
    //   const selectedAnswer = answers[+e - 1]
    //   setSelectedAnswers((prev: any) =>
    //     prev.includes(selectedAnswer.id)
    //       ? prev.filter((answer: any) => answer !== selectedAnswer.id)
    //       : [...prev, selectedAnswer.id],
    //   )
    //   setSelectedAnswers((prev) =>
    //     prev.includes(selectedAnswer.id)
    //       ? prev.filter((answer) => answer !== selectedAnswer.id)
    //       : [...prev, selectedAnswer.id],
    //   )
    // }
    // if (selectedAnswers.length > 0 && e === 'Enter') {
    //   if (progress === questions.length && !isTestEnded) {
    //     calculateResults()
    //     return
    //   }
    //   setProgress((prev: any) => prev + 1)
    //   setCurrentAnswer([])
    // }
  }

  useEffect(() => {
    if (pressedKey.length) {
      onKeyDownHandler(pressedKey[0])
    }
  }, [pressedKey])

  const calculateResults = () => {
    const resultToConfirm = [...result, ...selectedAnswers]
    const correctAnswers = questions
      .map((question) =>
        question.answers.filter((answer) => answer.isCorrect).map((answer) => answer.id),
      )
      .flat(1)
    const isSuccess = resultToConfirm.sort().join(',') === correctAnswers.sort().join(',')
    if (selectedAnswers.length == 0) {
      return
    }
    Modal.confirm({
      title: `Результат выполнения теста "${test.name}"`,
      content: isSuccess ? (
        <Typography.Title>
          <strong style={{ color: '#52C41A' }}>Тест пройден успешно</strong>
        </Typography.Title>
      ) : (
        <Typography.Title>
          <strong style={{ color: '#FF4D4E' }}>Тест не пройден</strong>
        </Typography.Title>
      ),
      cancelText: 'Перепройти',
      okText: 'Выйти',
      onCancel: () => {
        setIsTestStarted(false)
        setResult([])
        setSelectedAnswers([])
        setProgress(1)
      },
      onOk: () => {
        setIsTestStarted(false)
        setProgress(1)
        setResult([])
        setSelectedAnswers([])
        navigate('/tests')
      },
    })
  }

  return (
    <>
      <Button
        ref={leaveTestButtonRef}
        className='left-top'
        tabIndex={-1}
        icon={<IoCloseOutline></IoCloseOutline>}
        onClick={() =>
          modal.confirm({
            icon: <ExclamationCircleFilled rev={''} style={{ color: '#FAAC14' }} />,
            title: 'Вы действительно хотите прекратить выполнение теста?',
            okText: 'Да',
            cancelText: 'Нет',
            onCancel: () => {
              console.log('!')
            },
            onOk: () => setIsTestStarted(false),
          })
        }
      ></Button>
      <div className='test'>
        <Progress
          className='bottom'
          showInfo={false}
          percent={(progress / questions?.length) * 100}
          status='active'
        ></Progress>
        {selectedAnswers.length > 0 ? (
          progress === questions?.length ? (
            <Button className='right-bottom' onClick={() => calculateResults()}>
              Завершить
            </Button>
          ) : (
            <Button
              onClick={() => {
                setProgress((prev) => prev + 1)
                setResult((prev) => [...prev, ...selectedAnswers])
                setSelectedAnswers([])
              }}
              icon={<IoArrowForward />}
              className='test__next-button'
            ></Button>
          )
        ) : (
          ''
        )}
        <div className='test__question-title'>
          {questions[progress - 1] ? questions[progress - 1].title : ''}
        </div>
        <div className='test__answers'>
          {shuffledQuestions[progress - 1]?.answers?.map((e, i: number) => {
            return (
              <div
                className={
                  'test__answer' + (selectedAnswers.includes(e.id) ? ' test__answer_active' : '')
                }
                key={i}
              >
                <span className='test__answer-number'>
                  <p>{i + 1}</p>
                </span>
                <Button
                  onClick={() => {
                    setSelectedAnswers((prev) =>
                      prev.includes(e.id)
                        ? prev.filter((answer) => answer !== e.id)
                        : [...prev, e.id],
                    )
                    // setCurrentAnswer((prev: any) =>
                    //   prev.includes(e.id)
                    //     ? prev.filter((answer: any) => answer !== e.id)
                    //     : [...prev, e.id],
                    // )
                  }}
                >
                  {e.title}
                </Button>
              </div>
            )
          })}
        </div>
        {contextHolder}
      </div>
    </>
  )
}

export default Test
