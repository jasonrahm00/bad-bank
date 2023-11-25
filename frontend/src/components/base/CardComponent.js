import React from 'react'
import Card from 'react-bootstrap/Card'

function CardComponent(props) {
  const { header, subheader, text, body, colClasses, footerText } = props

  return (
    <Card as='main' className={colClasses ? colClasses : 'col-6'}>
      <Card.Header as='header'>
        {header && <Card.Title as='h1'>{header}</Card.Title>}
        {subheader && <Card.Subtitle as='h2'>{subheader}</Card.Subtitle>}
        {text && <p className='card-text'>{text}</p>}
      </Card.Header>
      {body && <Card.Body>{body}</Card.Body>}
      {footerText && (
        <Card.Footer>
          <p className='m-0'>{footerText}</p>
        </Card.Footer>
      )}
    </Card>
  )
}

export default CardComponent
