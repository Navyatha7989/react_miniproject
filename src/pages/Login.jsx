import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import Loader from '../components/Loader'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const {isAuthenticated, login} = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate('/', {replace: true})
  }, [isAuthenticated, navigate])

  const submit = async event => {
    event.preventDefault()
    setErrorMsg('')
    setLoading(true)

    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
      })
      const data = await response.json()

      if (response.ok) {
        login(data.jwt_token)
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        navigate(location.state?.from || '/', {replace: true})
      } else {
        setErrorMsg(data.error_msg || 'Invalid username or password')
      }
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="login-page">
      <div className="login-overlay" />
      <section className="login-card">
        <img
          className="login-logo"
          src="https://assets.ccbp.in/frontend/react-js/movies-app/movies-logo.png"
          alt="login website logo"
        />
        <form onSubmit={submit}>
          <h1>Login</h1>
          <label htmlFor="username">USERNAME</label>
          <input id="username" value={username} onChange={e => setUsername(e.target.value)} required />
          <label htmlFor="password">PASSWORD</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {errorMsg && <p className="error-message">* {errorMsg}</p>}
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  )
}