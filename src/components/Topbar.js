import React, { useState, useContext } from 'react'
import { Input, Popover, Button, Col, Row, Dropdown, Icon, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { StateContext } from './Global'
import Login from './Login'
import Register from './Register'
import Upload from './Upload'

function Topbar ({ match, backgroundClasses, history }) {
  const [ uploadModalVisibile, setUploadModalVisibile ] = useState(false)
  const { state, dispatch } = useContext(StateContext)

  let searchQuery = match.params.query || ''

  const setUploadModalUnvisibile = () => {
    setUploadModalVisibile(false)
  }

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    window.localStorage.clear()
    history.push('/')
  }

  const handleProfile = () => {
    history.push('/user/' + state.user.username + '/uploads')
  }

  const menu =
    <Menu>
      <Menu.Item key='1' onClick={handleProfile}>
        Profile
      </Menu.Item>
      <Menu.Item key='2' onClick={handleLogout}>
        Log Out
      </Menu.Item>
    </Menu>

  const loggedInControlos =
    <React.Fragment>
      <Button ghost onClick={() => setUploadModalVisibile(true)}>Upload</Button>
      <Dropdown overlay={menu} trigger={['click']} placement='bottomCenter'>
        <Button style={{ margin: '10px' }} type='link' ghost>
          <Icon type='user' style={{ fontSize: '19px' }} />
        </Button>
      </Dropdown>
    </React.Fragment>

  const loggedOutControlos =
    <React.Fragment>
      <Popover placement='bottom' trigger='click' content={<Login />} title='Log In'>
        <Button type='link' ghost>Log In</Button>
      </Popover>
      <Popover placement='bottomRight' trigger='click' content={<Register />} title='Sign Up'>
        <Button ghost>Sign Up</Button>
      </Popover>
    </React.Fragment>

  return (
    <div>
      <Row type='flex' justify='space-around' align='middle' style={{ height: '16vh' }} className={backgroundClasses}>
        <Col xs={{ span: 12, order: 1 }} md={{ span: 7, order: 1 }}>
          {(match.path !== '/')
            ? <Link className='nav-link' style={{ fontSize: '1.65em' }} to='/'>EON-PHOTOS</Link>
            : <Link className='nav-link logo' to='/'>EON-PHOTOS</Link>}
        </Col>
        <Col xs={{ span: 18, order: 3 }} md={{ span: 11, order: 1 }}>
          {(match.path !== '/')
            ? <Input.Search size='large' placeholder='Search Photos' value={searchQuery} onSearch={value => history.push('/search/' + value)} />
            : ''}
        </Col>
        <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}>
          { (state.isLoggedIn) ? loggedInControlos : loggedOutControlos}
        </Col>
      </Row>
      <Upload visible={uploadModalVisibile} setUnvisibile={setUploadModalUnvisibile} />
    </div>
  )
}

export default withRouter(Topbar)
