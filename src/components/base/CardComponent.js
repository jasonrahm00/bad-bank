function CardComponent(props) {
  const { header, title, text, body, status, bgcolor, txtcolor } = props

  function classes() {
    const bg = bgcolor ? ' bg-' + bgcolor : ''
    const txt = txtcolor ? ' text-' + txtcolor : ' text-white'
    return 'card mb-3 ' + bg + txt
  }

  return (
    <div className={classes()} style={{ maxWidth: '18rem' }}>
      <div className='card-header'>{header}</div>
      <div className='card-body'>
        {title && <h2 className='card-title'>{title}</h2>}
        {text && <p className='card-text'>{text}</p>}
        {body}
        {status && <div id='createStatus'>{status}</div>}
      </div>
    </div>
  )
}

export default CardComponent
