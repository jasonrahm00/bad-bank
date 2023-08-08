import Card from 'react-bootstrap/Card'

function CardComponent(props) {
  const { header, title, text, body, status, bgcolor, txtcolor } = props

  function classes() {
    const bg = bgcolor ? ' bg-' + bgcolor : ''
    const txt = txtcolor ? ' text-' + txtcolor : ' text-white'
    return 'mb-3 ' + bg + txt
  }

  return (
    <Card as='section' className={classes()} style={{ maxWidth: '18rem' }}>
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
