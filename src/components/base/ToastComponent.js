import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'

function ToastComponent(props) {
  const { message, show, onClose } = props

  return (
    <Toast onClose={onClose} show={show} delay={3000} autohide>
      <Toast.Header>{message}</Toast.Header>
    </Toast>
  )
}

export default ToastComponent
