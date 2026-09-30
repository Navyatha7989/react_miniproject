import React, {useState} from 'react'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navClass = ({isActive}) => isActive ? 'nav-link active' : 'nav-link'

  const searchClick = () => {
    setMenuOpen(false)
    navigate('/search')
  }

  return (
    <header className="header">
      <div className="header-inner">
        <button className="brand" onClick={() => navigate('/')} aria-label="Movies home">
          <span className="brand-mark">M</span>
          <span className="brand-text">MOVIES</span>
        </button>

        <button className="mobile-menu" onClick={() => setMenuOpen(v => !v)} aria-label="menu">
          ☰
        </button>

        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <NavLink className={navClass} to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink className={navClass} to="/popular" onClick={() => setMenuOpen(false)}>Popular</NavLink>
          <button
            type="button"
            className={location.pathname === '/search' ? 'search-button active' : 'search-button'}
            data-testid="searchButton"
            onClick={searchClick}
            aria-label="Search"
          >
            <HiOutlineSearch size={26} />
          </button>
          <button className="profile-button" onClick={() => {setMenuOpen(false); navigate('/account')}} aria-label="Profile">
            <img src="https://assets.ccbp.in/frontend/react-js/movies-app/profile-icon.png" alt="profile" />
          </button>
        </nav>
      </div>
    </header>
  )
}