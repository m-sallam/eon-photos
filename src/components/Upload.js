import React, { useState } from 'react'
import { Button, Icon, Modal, Upload, Input, message } from 'antd'

function PhotoModal ({ visible, setUnvisibile }) {
  const [ photoName, setPhotoName ] = useState('')

  const uploadProps = {
    name: 'photo',
    action: process.env.REACT_APP_SERVER_LOCATION + '/photos', // link
    headers: {
      authorization: window.localStorage.getItem('token')
    },
    data: {
      name: photoName
    },
    onChange (info) {
      console.log(info)
    },
    accept: 'image/*',
    beforeUpload () {
      if (!photoName.trim()) {
        message.error('Photo Name is required!')
        return false
      }
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Modal visible={visible}
        title='Upload a new Photo'
        maskClosable={false}
        onCancel={setUnvisibile}
        footer={null}>
        <div style={{ padding: '10px' }}>
          <Input onChange={(e) => setPhotoName(e.target.value)} style={{ margin: '30px', width: '65%' }} placeholder='Photo Name' />
          <Upload {...uploadProps}>
            <Button className='dark-background-hover' type='primary'>
              <Icon type='upload' /> Click to upload Photo
            </Button>
          </Upload>
        </div>
      </Modal>
    </div>
  )
}

export default PhotoModal
