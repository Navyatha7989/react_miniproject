import React, {useCallback, useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import MoviesGrid from '../components/MoviesGrid'
import Loader from '../components/Loader'
import FailureView from '../components/FailureView'
import Footer from '../components/Footer'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const initial = params.get('search') || ''
  const [input, setInput] = useState(initial)
  const [searchValue, setSearchValue] = useState(initial)
  const [movies, setMovies] = useState([])
  const [state, setState] = useState(initial ? 'loading' : 'idle')

  const searchMovies = useCallback(async value => {
    if (!value.trim()) {
      setMovies([])
      setState('idle')
      return
    }
    setState('loading')
    try {
      const response = await fetch(`https://apis.ccbp.in/movies-app/movies-search?search=${encodeURIComponent(value)}`, {
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

  useEffect(() => {
    if (initial) searchMovies(initial)
  }, [initial, searchMovies])

  const submit = event => {
    event.preventDefault()
    setSearchValue(input)
    setParams(input.trim() ? {search: input.trim()} : {})
    searchMovies(input.trim())
  }

  return (
    <div className="app-page">
      <main className="page-content search-page">
        <form className="search-form" onSubmit={submit}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Search movies..."
            aria-label="Search movies"
          />
          <button type="submit" data-testid="searchButton" aria-label="Search">
            <HiOutlineSearch size={25} />
          </button>
        </form>

        {state === 'loading' && <Loader />}
        {state === 'failure' && <FailureView onRetry={() => searchMovies(searchValue)} />}
        {state === 'success' && movies.length > 0 && <MoviesGrid movies={movies} />}
        {state === 'success' && movies.length === 0 && (
          <div className="no-results">
            <img src="https://assets.ccbp.in/frontend/react-js/movies-app/no-search-results.png" alt="no movies" />
            <h2>Search no results</h2>
            <p>Your search for {searchValue} did not find any matches.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : ''
}