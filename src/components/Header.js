import React from 'react'
import { withRouter } from 'react-router-dom'
import { Input } from 'antd'
import Topbar from './Topbar'
import background from '../assets/home_background.jpg'

function Header ({ history }) {
  return (
    <div className='header' style={{ backgroundImage: 'url(' + background + ')', height: '80vh', backgroundColor: '#283044' }}>
      <Topbar />
      <h1>The biggest photo gallery in the world</h1>
      <h2>Browse over 2 {'(yes, 2)'} photos</h2>
      <Input.Search className='home-search-bar' size='large' placeholder='Search Photos' onSearch={value => history.push('/search/' + value)} />

    </div>
  )
}

export default withRouter(Header)
