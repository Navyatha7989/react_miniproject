import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <main className="not-found">
      <img src="https://assets.ccbp.in/frontend/react-js/movies-app/not-found.png" alt="not found" />
      <h1>Page Not Found</h1>
      <p>We couldn't find the page you're looking for.</p>
      <button className="primary-button" onClick={() => navigate('/')}>Go Home</button>
    </main>
  )
}