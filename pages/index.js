import { useEffect, useState } from 'react'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const fetchUsers = async () => {
    const res = await fetch('/api/users')
    const data = await res.json()
    setUsers(data)
  }

  const createUser = async (e) => {
    e.preventDefault()
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    setName('')
    setEmail('')
    fetchUsers()
  }

  const deleteUser = async (id) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' })
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Managementt</h1>

      <form onSubmit={createUser} style={{ marginBottom: '1rem' }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.email}){' '}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
