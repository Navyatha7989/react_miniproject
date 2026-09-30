import React from 'react'

export default function FailureView({onRetry}) {
  return (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/movies-app/failure-view.png"
        alt="failure view"
      />
      <h2>Something went wrong</h2>
      <button type="button" onClick={onRetry}>Try Again</button>
    </div>
  )
}