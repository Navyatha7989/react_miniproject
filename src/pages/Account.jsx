import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import Footer from '../components/Footer'

export default function Account() {
  const navigate = useNavigate()
  const {logout} = useAuth()
  const username = localStorage.getItem('username') || ''
  const password = localStorage.getItem('password') || ''

  const doLogout = () => {
    logout()
    navigate('/login', {replace: true})
  }

  return (
    <div className="app-page">
      <main className="account-page">
        <h1>Account</h1>
        <div className="account-card">
          <div>
            <h3>Username</h3>
            <p>{username}</p>
          </div>
          <div>
            <h3>Password</h3>
            <p>{'•'.repeat(password.length || 8)}</p>
          </div>
          <div>
            <h3>Plan Details</h3>
            <p>Premium</p>
            <p>Ultra HD</p>
          </div>
          <button className="primary-button logout-button" onClick={doLogout}>Logout</button>
        </div>
      </main>
      <Footer />
    </div>
  )
}