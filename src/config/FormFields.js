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
      required: 'Name is required',
    },
  },
}

export const EmailField = {
  type: 'email',
  name: 'email',
  placeholder: 'Enter your email',
  label: 'Email',
}

export const PasswordField = {
  type: 'password',
  name: 'password',
  placeholder: 'Enter your password',
  label: 'Password',
}
