import React, { useState, useEffect } from 'react'
import { Spin, Form, Icon, Input, Button, message } from 'antd'
import { GlobalContext } from './Global'
import { withRouter } from 'react-router-dom'

function Login ({ form, history }) {
  let username = React.createRef()
  const { getFieldDecorator } = form
  const { actions } = GlobalContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    username.current.focus()
    // eslint-disable-next-line
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true)
        const res = await actions.login(values)
        setLoading(false)
        res.error
          ? message.error(res.message)
          : history.push('/user/' + res.body.user.username + '/uploads')
      }
    })
  }

  return (
    <Spin spinning={loading}>
      <Form onSubmit={handleSubmit} className='login'>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type='user' />}
              placeholder='Username'
              style={{ width: '250px' }}
              ref={username}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type='lock' />}
              type='password'
              placeholder='Password'
              style={{ width: '250px' }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' className='dark-background-hover' style={{ width: '100%' }} type='primary'>Log In</Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login)

export default withRouter(WrappedNormalLoginForm)
