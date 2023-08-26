import React from 'react'
import Card from 'react-bootstrap/Card'

function CardComponent(props) {
  const { header, subheader, text, body, colClasses } = props

  return (
    <Card as='main' className={colClasses ? colClasses : 'col-9'}>
      <Card.Body>
        <header className='mb-5'>
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
