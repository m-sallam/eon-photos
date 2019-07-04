import React, { useState, useEffect } from 'react'
import { Spin, Form, Icon, Input, Button, message } from 'antd'
import { GlobalContext } from './Global'
import { withRouter } from 'react-router-dom'
import { request } from '../request'

function Register ({ form, history }) {
  let email = React.createRef()
  const { getFieldDecorator } = form
  const { state, dispatch } = GlobalContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    email.current.focus()
    // eslint-disable-next-line
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        if (state.isLoggedIn) return message.error('Already logged in')
        setLoading(true)
        let res = await request('/users', 'POST', JSON.stringify(values))
        setLoading(false)
        if (!res.error) {
          dispatch({ type: 'REFRESH_TOKEN', payload: res.body.token })
          dispatch({ type: 'SET_USER', payload: res.body.user })
          history.push('/user/' + res.body.user.username + '/uploads')
          message.success('Welcome, ' + res.body.user.username)
        } else {
          message.error(res.message)
        }
      }
    })
  }

  return (
    <Spin spinning={loading}>
      <Form onSubmit={handleSubmit} className='register'>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(
            <Input
              prefix={<Icon type='mail' />}
              placeholder='E-mail'
              style={{ width: '250px' }}
              ref={email}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type='user' />}
              placeholder='Username'
              style={{ width: '250px' }}
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
          <Button htmlType='submit' className='dark-background-hover' style={{ width: '100%' }} type='primary'>Sign Up</Button>
        </Form.Item>
      </Form>
    </Spin>

  )
}

const WrappedNormalLoginForm = Form.create({ name: 'register' })(Register)

export default withRouter(WrappedNormalLoginForm)
