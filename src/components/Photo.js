import React, { useContext } from 'react'
import { Icon } from 'antd'
import PhotosContext from '../context/photos-context'

function Photo ({ photo }) {
  const context = useContext(PhotosContext)

  const clickCard = () => {
    context.updatePhotoData({
      id: photo.id,
      link: photo.link,
      fullThumbnail: photo.fullThumbnail,
      name: photo.name,
      likes: photo.likes,
      liked: photo.liked,
      user: photo.user
    })
  }

  return (
    <div className='card' onClick={clickCard}>
      <img alt='random' src={photo.thumbnail} />
      <span className='likes' >{photo.likes}
        <Icon className='icon' type='heart' theme='filled' />
      </span>
      <span className='photo-name'>{photo.name}</span>
    </div>
  )
}

export default Photo
