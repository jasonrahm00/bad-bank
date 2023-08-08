import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function FormComponent({ fields, onSubmit, defaultFormState }) {
  const [formData, setFormData] = useState(defaultFormState)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
      setFormData(defaultFormState)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => {
        return (
          <Form.Group key={field.name} controlId={field.name}>
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
            />
          </Form.Group>
        )
      })}
      <Button variant='secondary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default FormComponent
