import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'

function ToastComponent(props) {
  const { message } = props
  const [show, setShow] = useState(true)

  return (
    <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  )
}

export default ToastComponent
