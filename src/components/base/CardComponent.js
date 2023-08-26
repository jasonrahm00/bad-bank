import React from 'react'
import Card from 'react-bootstrap/Card'

function CardComponent(props) {
  const { header, subheader, text, body } = props

  return (
    <Card as='main' className='col-9'>
      <Card.Body>
        <header>
          {header && <Card.Title as='h1'>{header}</Card.Title>}
          {subheader && <Card.Subtitle as='h2'>{subheader}</Card.Subtitle>}
          {text && <p className='card-text'>{text}</p>}
        </header>
        {body && body}
      </Card.Body>
    </Card>
  )
}

export default CardComponent
