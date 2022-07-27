import React from 'react'
import { useNavigate } from 'react-router-dom'

function Homepage() {
  const navigate = useNavigate()
  return (
    <div className='Homepage'>
      <h1>Homepage</h1>
      <button onClick={() => {navigate('/cfp-calculator')}}>Start</button>
    </div>
  )
}

export default Homepage