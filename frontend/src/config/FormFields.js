const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const fieldRequired = {
  name: 'required',
  validate: (value) => !!value.trim(),
  errorMessage: 'Field required',
}

export const NameField = {
  type: 'text',
  name: 'name',
  placeholder: 'Enter your name',
  label: 'Name',
  validation: [fieldRequired],
}

export const EmailField = {
  type: 'text',
  name: 'email',
  placeholder: 'Enter your email',
  label: 'Email',
  validation: [
    fieldRequired,
    {
      name: 'validEmail',
      validate: (value) => value.match(emailRegex),
      errorMessage: 'Please enter a valid email address',
    },
  ],
}

export const SignupPasswordField = {
  type: 'text',
  name: 'password',
  placeholder: 'Enter your password',
  label: 'Password (Minimum of 8 characters)',
  validation: [
    fieldRequired,
    {
      name: 'pwLength',
      validate: (value) => value.length >= 8,
      errorMessage: 'Password must be at least 8 characters long',
    },
  ],
}

export const LoginPasswordField = {
  type: 'text',
  name: 'password',
  placeholder: 'Enter your password',
  label: 'Password',
  validation: [fieldRequired],
}

export const AmountField = {
  type: 'text',
  name: 'amount',
  placeholder: 'Enter Amount',
  label: 'Amount',
  validation: [
    fieldRequired,
    {
      name: 'isNum',
      validate: (value) => !isNaN(value),
      errorMessage: 'Please enter a number',
    },
    {
      name: 'isPositiveNum',
      validate: (value) => !(Number(value) < 0),
      errorMessage: 'Please enter a positive number',
    },
  ],
}
