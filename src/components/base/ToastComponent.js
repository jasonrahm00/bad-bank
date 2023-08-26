import React from 'react'
import Toast from 'react-bootstrap/Toast'

function ToastComponent(props) {
  const { message, show, onClose, variant } = props

  return (
    <Toast
      onClose={onClose}
      show={show}
      delay={5000}
      autohide={true}
      bg={variant.toLowerCase()}
    >
      <Toast.Header>{message}</Toast.Header>
    </Toast>
  )
}

export default ToastComponent
