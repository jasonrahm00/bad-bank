import React from 'react'
import Table from 'react-bootstrap/Table'
import { useUserContext } from '../../config/Context'
import CardComponent from '../base/CardComponent'

function AllData() {
  const { users } = useUserContext()

  return (
    <CardComponent
      header='All Data'
      body={
        <Table>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Password</th>
              <th scope='col'>Balance</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>${user.balance}</td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      }
    />
  )
}

export default AllData
