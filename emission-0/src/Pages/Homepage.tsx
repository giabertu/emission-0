import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Homepage() {
  const navigate = useNavigate()
  const location = useLocation();

  //Logic to pass carbon footprint calculation to homepage.
  const data: {totalFootprint: number} = location.state as {totalFootprint: number};
  console.log(data.totalFootprint);


  return (
    <div className='Homepage'>
      <h1>Homepage</h1>
      <button onClick={() => {navigate('/cfp-calculator')}}>Start</button>
    </div>
  )
}

export default Homepage