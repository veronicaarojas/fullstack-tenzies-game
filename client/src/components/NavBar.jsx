import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <div className='link--button'>
      <Link to="/"> Game </Link>
      </div>
      <div className='link--button'>
      <Link to="/leaderboard">Leaderboard</Link>
      </div>
    
    </nav>
  )
}

export default NavBar