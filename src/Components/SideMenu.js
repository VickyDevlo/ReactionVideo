import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css"

const Navbar = () => {
  return (
    <>
    <div className='sidebar'>
        <header>MY App</header>
        <div className="card nav-card">
  <div className="card-body">
    User workspace
  </div>
</div>
    <ul>
        <li><Link to ="/">Home</Link></li>
        <li><Link to ="/library">Library</Link></li>
        <li><Link to ="/notification">Notification</Link></li>
        <li><Link to ="/history">History</Link></li>
    </ul>
    </div>
    </>
    
  )
}

export default Navbar