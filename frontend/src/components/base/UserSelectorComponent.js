import React from 'react'
import { useUserContext } from '../../config/Context'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

function UserSelectorComponent() {
  const { users, changeUser, currentUser } = useUserContext()

  const handleChange = (e) => {
    const newCurrent = users.find((user) => user.email === e.target.value)
    changeUser(newCurrent)
  }

  return (
    <FloatingLabel
      controlId='user-selector'
      label='Select User'
      className='mb-3'
    >
      <Form.Select
        name='user'
        id='user-selector'
        defaultValue={currentUser.email ? currentUser.email : 'default'}
        onChange={handleChange}
      >
        <option value='default' disabled>
          Select User
        </option>
        {users &&
          users.map((user, index) => {
            return (
              <option value={user.email} key={index}>
                {user.name}
              </option>
            )
          })}
      </Form.Select>
    </FloatingLabel>
  )
}

export default UserSelectorComponent