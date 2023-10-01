import { Button, Card, Form, Input, Radio, Row } from 'antd'
import React, { useEffect } from 'react'
import './SettingsPage.scss'
import { useNavigate } from 'react-router-dom'

function SettingsPage() {
  const navigate = useNavigate()
  // const onFinish = (values: { username: string; password: string }) => {
  //   navigate('/admin')
  //   window.api.send('login', values)
  //   window.api.receive('login-reply', () => {
  //     window.api.send('check-auth', {})
  //   })
  //   window.api.receive('check-auth-reply', (response: string) => {
  //     localStorage.setItem('isAuth', response.toString())
  //     // if (response !== 'true') {
  //     // }
  //   })
  // }

  useEffect(() => {
    // window.api.send('check-db', {})
    navigate('/admin')
  }, [])

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo)
  // }

  // useEffect(() => {
  //   return () => {
  //     window.api.removeListener('login')
  //     window.api.removeListener('check-auth-reply')
  //     window.api.removeListener('check-auth')
  //     window.api.removeListener('login-reply')
  //   }
  // }, [])

  return (
    <div className='settingspage__wrapper scrollable'>
      {/* <Row className='settingspage__login-wrapper'>
        <Card title='Вход в систему'>
          <Form name='login' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
            <Form.Item
              label='Логин'
              name='username'
              rules={[{ required: true, message: 'Необходимо ввести логин!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Пароль'
              name='password'
              rules={[{ required: true, message: 'Необходимо ввести пароль!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row> */}
    </div>
  )
}

export default SettingsPage
