import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { request } from '../request'
import { Menu, Icon, message } from 'antd'
import Photos from './Photos'
import Topbar from './Topbar'

function Profile ({ match }) {
  const [uploads, setUploads] = useState([])
  const [likes, setLikes] = useState([])

  const route = match.path.split('/')[match.path.split('/').length - 1]

  useEffect(() => {
    async function getUser () {
      try {
        const res = await request('/users/' + match.params.username, 'GET')
        const requestedUser = res.body
        setUploads(requestedUser.uploads)
        setLikes(requestedUser.likes)
      } catch (err) {
        console.log(err)
        message.error('An error occured, could not fetch user!')
      }
    }
    getUser()
  }, [match.params.username])

  return (
    <div>
      <div style={{ height: '35vh' }} className='dark-background'>
        <Topbar />
        <h2 style={{ color: 'white', padding: '40px' }}>{match.params.username}'s photos</h2>

      </div>
      <Menu className='dark-background' style={{ border: 'none' }} selectedKeys={[route]} mode='horizontal'>
        <Menu.Item key='uploads'>
          <Link to={'/user/' + match.params.username + '/uploads'} style={{ color: 'white' }} >
            <Icon type='upload' />
            Uploads
          </Link>
        </Menu.Item>
        <Menu.Item key='likes'>
          <Link to={'/user/' + match.params.username + '/likes'} style={{ color: 'white' }}>
            <Icon type='heart' />
              Likes
          </Link>
        </Menu.Item>
      </Menu>
      <Photos passedPhotos={(route === 'uploads') ? uploads : likes} />
    </div>

  )
}

export default withRouter(Profile)
