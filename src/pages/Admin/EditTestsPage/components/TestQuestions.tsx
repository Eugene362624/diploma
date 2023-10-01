import React from 'react'
import { Button, Form } from 'antd'
import { BiRightArrowAlt } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import ButtonGroup from 'antd/es/button/button-group'

function TestQuestions({
  questions,
  setOpenedQuestionId,
  deleteQuestion,
}: {
  questions: any[]
  setOpenedQuestionId: React.Dispatch<React.SetStateAction<string>>
  deleteQuestion: React.Dispatch<React.SetStateAction<any>>
}): JSX.Element {
  return (
    <>
      {questions?.map((quesiton, index) => {
        return (
          <Form.Item key={crypto.randomUUID()} label={`Вопрос ${index + 1}`}>
            <p>{quesiton?.title}</p>
            <ButtonGroup>
              <Button onClick={() => deleteQuestion(quesiton.id)} icon={<AiFillDelete />} />
              <Button
                icon={<BiRightArrowAlt />}
                onClick={() => {
                  setOpenedQuestionId(quesiton.id)
                }}
              />
            </ButtonGroup>
          </Form.Item>
        )
      })}
    </>
  )
}

export default TestQuestions
