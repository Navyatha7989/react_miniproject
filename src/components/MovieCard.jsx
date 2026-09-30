import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function MovieCard({movie}) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      className="movie-card"
      data-testid="movieItem"
      onClick={() => navigate(`/movies/${movie.id}`)}
      aria-label={movie.title}
    >
      <img src={movie.poster_path} alt={movie.title} />
    </button>
  )
}