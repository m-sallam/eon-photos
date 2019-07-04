import React from 'react'
import Header from './Header'
import Photos from './Photos'
import { Button } from 'antd'

function Photo ({ match }) {
  return (
    <div className='home'>
      <Header />
      <Photos />
      <Button size='large' className='show-more-button' href='/search' ghost> Show More</Button>
    </div>
  )
}

export default Photo
