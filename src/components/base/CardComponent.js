import React from 'react'
import Card from 'react-bootstrap/Card'

function CardComponent(props) {
  const { header, subheader, text, body, colClasses } = props

  return (
    <Card as='main' className={colClasses ? colClasses : 'col-9'}>
      <Card.Header as='header'>
        {header && <Card.Title as='h1'>{header}</Card.Title>}
        {subheader && <Card.Subtitle as='h2'>{subheader}</Card.Subtitle>}
        {text && <p className='card-text'>{text}</p>}
      </Card.Header>
      <Card.Body>{body && body}</Card.Body>
    </Card>
  )
}

export default CardComponent
