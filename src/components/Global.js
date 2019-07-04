import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { request } from '../request'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
export const StateContext = createContext()

const initialState = {
  user: null,
  isLoggedIn: false,
  token: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER' :
      window.localStorage.setItem('user', JSON.stringify(action.payload))
      state.user = action.payload
      state.isLoggedIn = true
      return state
    case 'LOGOUT' :
      state.user = null
      state.token = null
      state.isLoggedIn = false
      return state
    case 'REFRESH_TOKEN':
      const date = Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days from now
      window.localStorage.setItem('token', action.payload)
      window.localStorage.setItem('expiresIn', date)
      state.token = action.payload
      return state
    default:
      return state
  }
}

const GlobalState = ({ children, history }) => {
  let [state, dispatch] = useReducer(reducer, initialState)

  const register = async (data) => {
    if (state.isLoggedIn) return { error: true, message: 'Already logged in' }
    let res = await request('/users', 'POST', JSON.stringify(data))
    if (!res.error) {
      dispatch({ type: 'REFRESH_TOKEN', payload: res.body.token })
      dispatch({ type: 'SET_USER', payload: res.body.user })
    }
    return res
  }

  const login = async (data) => {
    if (state.isLoggedIn) return { error: true, message: 'Already logged in' }
    let res = await request('/auth/login', 'POST', JSON.stringify(data))
    if (!res.error) {
      dispatch({ type: 'REFRESH_TOKEN', payload: res.body.token })
      dispatch({ type: 'SET_USER', payload: res.body.user })
    }
    return res
  }

  const logout = async () => {
    dispatch({ type: 'LOGOUT' })
    window.localStorage.clear()
    history.push('/')
  }

  const refreshToken = async () => {
    const token = window.localStorage.getItem('token')
    const expiresIn = window.localStorage.getItem('expiresIn')
    if (!token || !expiresIn) return false

    const date = Date.now()
    if (expiresIn <= date) {
      console.log('hohooh')
      return logout()
    }
    if (expiresIn - date < 259200000) return false // return if the token was refreshed less than 3 days ago

    const res = await request('/auth/refresh', 'POST', JSON.stringify({ token }))
    if (res.error) return message.error(res.message)

    const user = window.localStorage.getItem('user')
    try {
      var parsedUser = JSON.parse(user)
      dispatch({ type: 'REFRESH_TOKEN', payload: res.body.token })
      dispatch({ type: 'SET_USER', payload: JSON.parse(parsedUser) })
      return true
    } catch (err) {
      dispatch({ type: 'LOGOUT' })
      window.localStorage.clear()
      return false
    }
  }

  useEffect(() => {
    refreshToken()
    // eslint-disable-next-line
  }, [])

  const contextValue = {
    reducer: useReducer(reducer, initialState),
    actions: { register, login, logout, refreshToken }
  }

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  )
}

export const GlobalStateProvider = withRouter(GlobalState)
export const GlobalContext = () => useContext(StateContext)
