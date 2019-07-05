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
      state = { ...state,
        user: action.payload,
        isLoggedIn: true
      }
      return state
    case 'LOGOUT' :
      return { user: null, isLoggedIn: false, token: null }
    case 'REFRESH_TOKEN':
      const date = Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days from now
      window.localStorage.setItem('token', action.payload)
      window.localStorage.setItem('expiresIn', date)
      state = { ...state, token: action.payload }
      return state
    default:
      return state
  }
}

const GlobalState = ({ children, history }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const logout = () => {
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
      dispatch({ type: 'SET_USER', payload: parsedUser })
      return true
    } catch (err) {
      console.log(err)
      dispatch({ type: 'LOGOUT' })
      window.localStorage.clear()
      return false
    }
  }

  useEffect(() => {
    refreshToken()
    // eslint-disable-next-line
  }, [])

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}

export const GlobalStateProvider = withRouter(GlobalState)
export const GlobalContext = () => useContext(StateContext)
