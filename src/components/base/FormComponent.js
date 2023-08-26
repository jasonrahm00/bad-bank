import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useUserContext } from '../../config/Context'

function FormComponent({ fields, onSubmit, defaultFormState }) {
  const { users } = useUserContext()
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
      if (field.name === 'email') {
        if (users.find((user) => user.email === formData.email)) {
          errors['email'] = 'Account with that email already exists'
        }
      }
    })
    return errors
  }

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((field) => {
        return (
          <Form.Group key={field.name}>
            <FloatingLabel controlId={field.name} label={field.label}>
              <Form.Control
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleInputChange}
              />
            </FloatingLabel>
            {formErrors[field.name] && (
              <p className='text-danger'>{formErrors[field.name]}</p>
            )}
          </Form.Group>
        )
      })}
      <Button
        variant={!formFilled ? 'secondary' : 'primary'}
        type='submit'
        disabled={!formFilled}
      >
        Submit
      </Button>
    </Form>
  )
}

export default FormComponent
