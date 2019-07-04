import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Photos from './Photos'
import { Button } from 'antd'

function Photo ({ match }) {
  return (
    <div className='home'>
      <Header />
      <Photos />
      <Link to='/search'><Button size='large' className='show-more-button' ghost> Show More  </Button></Link>
    </div>
  )
}

export default Photo
