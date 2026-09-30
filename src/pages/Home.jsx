import React, {useCallback, useEffect, useState} from 'react'
import MovieRow from '../components/MovieRow'
import FailureView from '../components/FailureView'
import Loader from '../components/Loader'
import Footer from '../components/Footer'

const api = {
  trending: 'https://apis.ccbp.in/movies-app/trending-movies',
  originals: 'https://apis.ccbp.in/movies-app/originals',
  topRated: 'https://apis.ccbp.in/movies-app/top-rated-movies'
}

export default function Home() {
  const [trending, setTrending] = useState([])
  const [originals, setOriginals] = useState([])
  const [topRated, setTopRated] = useState([])
  const [trendingState, setTrendingState] = useState('loading')
  const [originalsState, setOriginalsState] = useState('loading')
  const [topRatedState, setTopRatedState] = useState('loading')

  const fetchMovies = useCallback(async (url, setData, setState) => {
    setState('loading')
    try {
      const response = await fetch(url, {headers: {Authorization: `Bearer ${getCookie('jwt_token')}`}})
      if (!response.ok) throw new Error()
      const data = await response.json()
      setData(data.results || [])
      setState('success')
    } catch {
      setState('failure')
    }
  }, [])

  const loadAll = useCallback(() => {
    fetchMovies(api.trending, setTrending, setTrendingState)
    fetchMovies(api.originals, setOriginals, setOriginalsState)
    fetchMovies(api.topRated, setTopRated, setTopRatedState)
  }, [fetchMovies])

  useEffect(() => { loadAll() }, [loadAll])

  const hero = originals.length ? originals[Math.floor(Math.random() * originals.length)] : null

  return (
    <div className="app-page">
      {originalsState === 'loading' && !hero ? <Loader /> : null}
      {hero && (
        <section className="hero" style={{backgroundImage: `linear-gradient(90deg, rgba(15,15,15,.95), rgba(15,15,15,.55), rgba(15,15,15,.1)), url(${hero.backdrop_path})`}}>
          <div className="hero-content">
            <h1>{hero.title}</h1>
            <p>{hero.overview}</p>
            <button className="primary-button" onClick={() => window.location.href = `/movies/${hero.id}`}>Play</button>
          </div>
        </section>
      )}

      <main className="content">
        {trendingState === 'success' ? <MovieRow title="Trending Now" movies={trending} /> :
          <FailureOrLoading state={trendingState} title="Trending Now" retry={() => fetchMovies(api.trending, setTrending, setTrendingState)} />}

        {originalsState === 'success' ? <MovieRow title="Originals" movies={originals} /> :
          <FailureOrLoading state={originalsState} title="Originals" retry={() => fetchMovies(api.originals, setOriginals, setOriginalsState)} />}

        {topRatedState === 'success' ? <MovieRow title="Top Rated" movies={topRated} /> :
          <FailureOrLoading state={topRatedState} title="Top Rated" retry={() => fetchMovies(api.topRated, setTopRated, setTopRatedState)} />}
      </main>
      <Footer />
    </div>
  )
}

function FailureOrLoading({state, title, retry}) {
  if (state === 'loading') return <MovieRow title={title} movies={[]} loading />
  return <section className="movie-section"><h2>{title}</h2><FailureView onRetry={retry} /></section>
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : ''
}