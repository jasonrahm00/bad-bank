import React, { useState } from 'react'

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
    <form onSubmit={handleSubmit}>
      {fields.map((field) => {
        return (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleInputChange}
              placeholder={field.placeholder}
            />
          </div>
        )
      })}
      <button type='submit'>Submit</button>
    </form>
  )
}

export default FormComponent
