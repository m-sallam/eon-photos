import React from 'react'
import Photos from './Photos'
import Topbar from './Topbar'

function Search ({ match }) {
  return (
    <div>
      <Topbar backgroundClasses='search-header dark-background search' />
      <Photos query={match.params.query} />
    </div>
  )
}

export default Search
