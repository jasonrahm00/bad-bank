import { useContext } from 'react'
import { UserContext } from '../../config/Context'
import Table from 'react-bootstrap/Table'

function AllData() {
  const ctx = useContext(UserContext)
  return (
    <>
      <h1>All Data</h1>
      <Table>
        <thead>
          <tr>
            <th scope='col'>Email</th>
            <th scope='col'>Name</th>
            <th scope='col'>Password</th>
          </tr>
        </thead>
        <tbody>
          {ctx.users &&
            ctx.users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </>
  )
}

export default AllData
