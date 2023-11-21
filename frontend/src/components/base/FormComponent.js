import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import ToastComponent from '../base/ToastComponent'
import { toastDefault } from '../../config/Defaults'

function FormComponent({ fields, onSubmit, defaultFormState, ctaText }) {
  const [toast, setToast] = useState(toastDefault)
  const [formData, setFormData] = useState(defaultFormState)
  const [formErrors, setFormErrors] = useState({})
  const [formFilled, setFormFilled] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setFormErrors({ ...formErrors, [name]: '' })
    setFormFilled(Object.values({ ...formData, [name]: value }).some(Boolean))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length === 0) {
      try {
        const result = await onSubmit(formData)
        if (result.success) {
          setToast({
            message: result.message,
            showToast: true,
            variant: 'success',
          })
          if (result.type == 'account') {
            setAccountCreated(true)
          }
          setFormData(defaultFormState)
          setFormFilled(false)
          setFormErrors({})
        } else {
          throw result.message
        }
      } catch (error) {
        setToast({
          message: error.message,
          showToast: true,
          variant: 'danger',
        })
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
            return
          }
        }
      }
    })
    return errors
  }

  return (
    <>
      <ToastComponent
        message={toast.message}
        show={toast.showToast}
        variant={toast.variant}
        onClose={() => setToast(toastDefault)}
      />
      {accountCreated ? (
        <Button
          variant='success'
          className='mt-3'
          onClick={() => setAccountCreated(false)}
        >
          Add another account?
        </Button>
      ) : (
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
                <p className='text-danger m-0'>
                  {formErrors[field.name] ? (
                    formErrors[field.name]
                  ) : (
                    <>&nbsp;</>
                  )}
                </p>
              </Form.Group>
            )
          })}
          <Button
            variant={!formFilled ? 'secondary' : 'primary'}
            type='submit'
            disabled={!formFilled}
            className='mt-3'
          >
            {ctaText ? ctaText : 'Submit'}
          </Button>
        </Form>
      )}
    </>
  )
}

export default FormComponent
