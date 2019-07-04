import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { GlobalStateProvider } from './components/Global'
import Home from './components/Home'
import Search from './components/Search'
import Profile from './components/Profile'
import Footer from './components/Footer'

function App () {
  return (
    <Router>
      <GlobalStateProvider>
        <div className='App'>
          <Route exact path='/' component={Home} />
          <Route exact path='/search/' component={Search} />
          <Route path='/search/:query' component={Search} />
          <Route path='/user/:username/uploads' component={Profile} />
          <Route path='/user/:username/likes' component={Profile} />
          <Footer />
        </div>
      </GlobalStateProvider>
    </Router>
  )
}

export default App
