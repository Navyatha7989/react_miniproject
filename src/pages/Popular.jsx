import React, {useCallback, useEffect, useState} from 'react'
import MoviesGrid from '../components/MoviesGrid'
import Loader from '../components/Loader'
import FailureView from '../components/FailureView'
import Footer from '../components/Footer'

export default function Popular() {
  const [movies, setMovies] = useState([])
  const [state, setState] = useState('loading')

  const fetchPopular = useCallback(async () => {
    setState('loading')
    try {
      const response = await fetch('https://apis.ccbp.in/movies-app/popular-movies', {
        headers: {Authorization: `Bearer ${getCookie('jwt_token')}`}
      })
      if (!response.ok) throw new Error()
      const data = await response.json()
      setMovies(data.results || [])
      setState('success')
    } catch {
      setState('failure')
    }
  }, [])

  useEffect(() => { fetchPopular() }, [fetchPopular])

  return (
    <div className="app-page">
      <main className="page-content">
        <h1 className="page-title">Popular Movies</h1>
        {state === 'loading' && <Loader />}
        {state === 'failure' && <FailureView onRetry={fetchPopular} />}
        {state === 'success' && <MoviesGrid movies={movies} />}
      </main>
      <Footer />
    </div>
  )
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : ''
}