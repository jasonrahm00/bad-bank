const messages = {
  required: 'Field required',
}

export const NameField = {
  type: 'text',
  name: 'name',
  placeholder: 'Enter your name',
  label: 'Name',
  validation: {
    rules: [
      {
        name: 'required',
        validate: (value) => !!value.trim(),
      },
    ],
    errorMessages: {
      required: messages.required,
    },
  },
}

export const EmailField = {
  type: 'text',
  name: 'email',
  placeholder: 'Enter your email',
  label: 'Email',
}

export const PasswordField = {
  type: 'text',
  name: 'password',
  placeholder: 'Enter your password',
  label: 'Password',
}
