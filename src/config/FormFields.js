const validationRules = {
  required: {
    name: 'required',
    validate: (value) => !!value.trim(),
    errorMessage: 'Field required',
  },
}

export const NameField = {
  type: 'text',
  name: 'name',
  placeholder: 'Enter your name',
  label: 'Name',
  validation: [validationRules.required],
}

export const EmailField = {
  type: 'text',
  name: 'email',
  placeholder: 'Enter your email',
  label: 'Email',
  validation: [validationRules.required],
}

export const PasswordField = {
  type: 'text',
  name: 'password',
  placeholder: 'Enter your password',
  label: 'Password',
  validation: [
    validationRules.required,
    {
      name: 'pwLength',
      validate: (value) => value.length >= 8,
      errorMessage: 'Password must be at least 8 characters long',
    },
  ],
}
