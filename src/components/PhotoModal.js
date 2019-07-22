import React, { useContext, useState, useEffect } from 'react'
import { Button, Icon, Modal, Popover, Spin } from 'antd'
import { Link } from 'react-router-dom'
import PhotosContext from '../context/photos-context'
import { GlobalContext } from './Global'

function PhotoModal (props) {
  const selectedPhoto = useContext(PhotosContext)
  const { state } = GlobalContext()
  const [imageSrc, setImageSrc] = useState('')
  const [loading, setLoading] = useState(true)

  let link = React.createRef()

  useEffect(() => {
    setLoading(true)
    const image = new window.Image()

    image.onload = () => {
      setImageSrc(selectedPhoto.selectedPhotoLink)
      setLoading(false)
    }
    image.src = selectedPhoto.selectedPhotoLink
  }, [selectedPhoto.selectedPhotoLink])

  const like = (e) => {
    if (selectedPhoto.selectedPhotoLiked) {
      selectedPhoto.unlike()
    } else {
      selectedPhoto.like()
    }
  }

  const copy = () => {
    link.current.select()
    document.execCommand('copy')
  }

  let likeTheme = selectedPhoto.selectedPhotoLiked ? 'filled' : 'outlined'

  const footer =
    <div className='modal-footer'>
      <textarea readOnly style={{ position: 'absolute', left: '-9999px' }} ref={link} value={selectedPhoto.selectedPhotoLink} />
      <Button disabled={!state.isLoggedIn} style={{ float: 'left' }}shape='circle' type='danger' onClick={like} title='Like' ghost ><Icon type='heart' theme={likeTheme} /></Button>
      <span title='Likes' style={{ float: 'left', marginLeft: '5px', marginTop: '5px' }}>{selectedPhoto.selectedPhotoLikes}</span>
      <Popover trigger='click' content='Link Copied' title={null} >
        <Button type='primary' shape='circle' style={{ color: 'orange', borderColor: 'orange' }} onClick={copy} title='Copy Image Link' ghost><Icon type='copy' theme='filled' /></Button>
      </Popover>
      <Button shape='circle' icon='arrows-alt' type='primary' style={{ marginLeft: '5px' }} href={selectedPhoto.selectedPhotoLink} target='_blank'title='Open Image in Full Resolution' ghost />
    </div>

  return (
    <Modal
      title={<div>{selectedPhoto.selectedPhotoName}  by   <Link to={'/user/' + selectedPhoto.selectedPhotoUser + '/uploads'} >{selectedPhoto.selectedPhotoUser}</Link></div>}
      visible={selectedPhoto.modalVisible}
      footer={footer}
      style={{ top: 20 }}
      maskClosable={false}
      onCancel={selectedPhoto.setModalVisible}
    >
      <Spin spinning={loading} size='large'>
        <img style={{ width: '100%' }} src={imageSrc} alt={selectedPhoto.selectedPhotoName} />
      </Spin>
    </Modal>
  )
}

export default PhotoModal
