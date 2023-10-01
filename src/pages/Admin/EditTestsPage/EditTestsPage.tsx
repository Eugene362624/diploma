import React, { useEffect, useState } from 'react'
import './EditTestsPage.scss'
import { Button, Card, Divider, List, Row, Tooltip } from 'antd'
import { testApi } from 'src/api/test'
import { ITest } from 'src/interfaces/Test.interface'
import TestModal from './components/TestModal'
import { AiFillLock } from 'react-icons/ai'

// component to create new or to edit questions
function EditTestsPage(): JSX.Element {
  const [tests, setTests] = useState<ITest[]>([])
  const [editingTestId, setEditingTestId] = useState<string>(null)
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchTests()
  }, [isTestModalOpen])

  const fetchTests = async () => {
    setLoading(true)
    const tests = await testApi.getAll({})
    setTests(tests)
    setTimeout(() => setLoading(false), 500)
  }

  const openEditTestModal = (testId: string): void => {
    // setIsEditTestModalOpen(true)
    setIsTestModalOpen(true)
    setEditingTestId(testId)
  }

  return (
    <Card className='edit-tests-page__wrapper'>
      <Divider orientation='left'>Список тестов</Divider>
      <List
        footer={
          <Button block onClick={() => openEditTestModal(null)}>
            Добавить новый тест
          </Button>
        }
        loading={loading}
        bordered
        dataSource={tests}
        renderItem={(test) => (
          <List.Item>
            <Row justify={'space-between'}>
              {test?.name}
              <Row style={{ width: 'fit-content' }} justify={'end'}>
                {test.isDraft ? (
                  <Tooltip title='Данный тест скрыт'>
                    <AiFillLock />
                  </Tooltip>
                ) : (
                  <></>
                )}
                <Button onClick={() => openEditTestModal(test?.id)}>Редактировать</Button>
              </Row>
            </Row>
          </List.Item>
        )}
      />
      <TestModal
        setIsTestModalOpen={setIsTestModalOpen}
        isTestModalOpen={isTestModalOpen}
        editingTestId={editingTestId}
        setEditingTestId={setEditingTestId}
      />
    </Card>
  )
}

export default EditTestsPage
