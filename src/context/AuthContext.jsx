import React, {createContext, useContext, useMemo, useState} from 'react'

const AuthContext = createContext(null)

export function AuthProvider({children}) {
  const [token, setToken] = useState(() => {
    const match = document.cookie.match(/(?:^|; )jwt_token=([^;]*)/)
    return match ? decodeURIComponent(match[1]) : ''
  })

  const login = jwt => {
    document.cookie = `jwt_token=${encodeURIComponent(jwt)}; path=/`
    setToken(jwt)
  }

  const logout = () => {
    document.cookie = 'jwt_token=; Max-Age=0; path=/'
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    setToken('')
  }

  const value = useMemo(() => ({token, isAuthenticated: Boolean(token), login, logout}), [token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)