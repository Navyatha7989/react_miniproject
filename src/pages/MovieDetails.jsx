import React, {useCallback, useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {format} from 'date-fns'
import Loader from '../components/Loader'
import FailureView from '../components/FailureView'
import MovieRow from '../components/MovieRow'
import Footer from '../components/Footer'

export default function MovieDetails() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [state, setState] = useState('loading')

  const fetchDetails = useCallback(async () => {
    setState('loading')
    try {
      const response = await fetch(`https://apis.ccbp.in/movies-app/movies/${id}`, {
        headers: {Authorization: `Bearer ${getCookie('jwt_token')}`}
      })
      if (!response.ok) throw new Error()
      const data = await response.json()
      setMovie(data.movie_details)
      setState('success')
    } catch {
      setState('failure')
    }
  }, [id])

  useEffect(() => { fetchDetails() }, [fetchDetails])

  if (state === 'loading') return <Loader type="clip" />
  if (state === 'failure') return <div className="details-state"><FailureView onRetry={fetchDetails} /></div>

  const runtime = movie.runtime || 0
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const date = movie.release_date ? safeDate(movie.release_date) : null

  return (
    <div className="app-page">
      <section className="details-hero" style={{backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.9), rgba(0,0,0,.55)), url(${movie.backdrop_path})`}}>
        <div className="details-content">
          <h1>{movie.title}</h1>
          <p className="details-overview">{movie.overview}</p>
          <div className="meta">
            <span>{movie.adult ? 'A' : 'U/A'}</span>
            <span>{date ? format(date, 'yyyy') : ''}</span>
            <span>{hours}h {minutes}m</span>
            <span>{(movie.genres || []).map(g => g.name).join(' • ')}</span>
          </div>
          <button className="primary-button" onClick={() => navigate(`/movies/${id}/play`)}>Play</button>
        </div>
      </section>

      <main className="content details-body">
        <h2>Movie Details</h2>
        <div className="info-grid">
          <div><strong>Genres</strong><p>{(movie.genres || []).map(g => g.name).join(', ')}</p></div>
          <div><strong>Audio</strong><p>{movie.spoken_languages?.map(l => l.english_name || l.name).join(', ') || 'English'}</p></div>
          <div><strong>Budget</strong><p>{movie.budget || 'N/A'}</p></div>
          <div><strong>Rating</strong><p>{movie.vote_average || 'N/A'}</p></div>
        </div>
        <MovieRow title="More Like This" movies={movie.similar_movies || []} />
      </main>
      <Footer />
    </div>
  )
}

function safeDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : ''
}