import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from './Mission-0.png'
import './Homepage.css'

function Homepage() {
  const navigate = useNavigate()
  const location = useLocation();

  //Logic to pass carbon footprint calculation to homepage.
  const data: {totalFootprint: number} = location.state as {totalFootprint: number};
  console.log(data.totalFootprint);


  return (
    <div className='Homepage'>
      <h1>Homepage</h1>
      <div>
        <img className='logo' src={logo} />
      </div>
      <button onClick={() => {navigate('/cfp-calculator')}}>Start</button>
    </div>
  )
}

export default Homepage