import React, { useState, useEffect } from 'react'
import PhotosContext from '../context/photos-context'
import Photo from './Photo'
import PhotoModal from './PhotoModal'
import { request } from '../request'
import { message } from 'antd'

function Photos ({ query, passedPhotos }) {
  const [photos, setPhotos] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedPhotoId, setSelectedPhotoId] = useState('')
  const [selectedPhotoName, setSelectedPhotoName] = useState('')
  const [selectedPhotoLink, setSelectedPhotoLink] = useState('')
  const [selectedPhotoFullThumb, setSelectedPhotoFullThumb] = useState('')
  const [selectedPhotoUser, setselectedPhotoUser] = useState('')
  const [selectedPhotoLikes, setSelectedPhotoLikes] = useState(0)
  const [selectedPhotoLiked, setSelectedPhotoLiked] = useState(false)

  const PhotosContextValue = {
    modalVisible,
    selectedPhotoId,
    selectedPhotoName,
    selectedPhotoLink,
    selectedPhotoFullThumb,
    selectedPhotoLikes,
    selectedPhotoLiked,
    selectedPhotoUser,
    updatePhotoData: (photo) => {
      setModalVisible(true)
      setSelectedPhotoId(photo.id)
      setSelectedPhotoName(photo.name)
      setSelectedPhotoLink(photo.link)
      setSelectedPhotoFullThumb(photo.fullThumb)
      setSelectedPhotoLikes(photo.likes)
      setselectedPhotoUser(photo.user)
      setSelectedPhotoLiked(photo.liked)
    },
    setModalVisible: () => {
      setModalVisible(false)
    },
    like: async () => {
      const res = await request('/photos/' + selectedPhotoId + '/like', 'PUT')
      if (res.error) return message.error('An error occured, could not like photo')
      setSelectedPhotoLikes(selectedPhotoLikes + 1)
      setSelectedPhotoLiked(true)
    },
    unlike: async () => {
      const res = await request('/photos/' + selectedPhotoId + '/unlike', 'PUT')
      if (res.error) return message.error('An error occured, could not unlike photo')
      setSelectedPhotoLikes(selectedPhotoLikes - 1)
      setSelectedPhotoLiked(false)
    }
  }

  useEffect(() => {
    async function getPhotos () {
      try {
        const res = query
          ? await request('/photos?query=' + query, 'GET')
          : await request('/photos', 'GET')

        const requestedPhotos = passedPhotos || res.body
        setPhotos(requestedPhotos)
      } catch (err) {
        console.log(err)
        message.error('An error occured, could not load photos')
      }
    }
    getPhotos()
  }, [query, passedPhotos])

  let photosContent = photos.map((photo, key) => {
    return (
      <Photo key={key} photo={photo} />
    )
  })

  return (
    <PhotosContext.Provider value={PhotosContextValue}>
      <PhotoModal />
      <div className='photos'>
        { photosContent }
      </div>
    </PhotosContext.Provider>

  )
}

export default Photos
