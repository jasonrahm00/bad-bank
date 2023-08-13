import React from 'react'
import Card from 'react-bootstrap/Card'

function CardComponent(props) {
  const { header, title, text, body, status, bgcolor, txtcolor } = props

  return (
    <Card as='section' bg={bgcolor} text={txtcolor}>
      <Card.Title as='h1'>{header}</Card.Title>
      <Card.Body>
        {title && <Card.Subtitle as='h2'>{title}</Card.Subtitle>}
        {text && <p className='card-text'>{text}</p>}
        {body}
        {status && <div id='createStatus'>{status}</div>}
      </Card.Body>
    </Card>
  )
}

export default CardComponent
