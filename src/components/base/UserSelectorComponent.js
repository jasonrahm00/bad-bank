import React from 'react'
import { useUserContext } from '../../config/Context'

function UserSelectorComponent() {
  const { users, currentUser, changeUser } = useUserContext()

  const handleChange = (e) => {
    const newCurrent = users.find((user) => user.email === e.target.value)
    changeUser(newCurrent)
  }

  return (
    <>
      <label htmlFor='user-selector'>Select User</label>
      <select
        name='user'
        id='user-selector'
        defaultValue={currentUser ? currentUser.email : 'default'}
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
      </select>
    </>
  )
}

export default UserSelectorComponent
