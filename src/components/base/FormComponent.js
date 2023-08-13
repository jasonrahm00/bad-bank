import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function FormComponent({ fields, onSubmit, defaultFormState }) {
  const [formData, setFormData] = useState(defaultFormState)
  const [formErrors, setFormErrors] = useState({})
  const [formFilled, setFormFilled] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setFormErrors({ ...formErrors, [name]: '' })
    setFormFilled(Object.values({ ...formData, [name]: value }).some(Boolean))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length === 0) {
      if (onSubmit) {
        onSubmit(formData)
        setFormData(defaultFormState)
        setFormFilled(false)
      }
    } else {
      setFormErrors(errors)
    }
  }

  const validateForm = () => {
    const errors = {}
    fields.forEach((field) => {
      if (field.validation) {
        const { name, validation } = field
        const value = formData[name]
        const rules = validation || []

        for (const rule of rules) {
          if (!rule.validate(value)) {
            errors[name] = rule.errorMessage || 'Invalid Input'
          }
        }
      }
    })
    return errors
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
            {formErrors[field.name] && (
              <p style={{ color: 'red' }}>{formErrors[field.name]}</p>
            )}
          </Form.Group>
        )
      })}
      <Button variant='secondary' type='submit' disabled={!formFilled}>
        Submit
      </Button>
    </Form>
  )
}

export default FormComponent
