import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Homepage from './Homepage';
import Offset from './Offset';

function LandingPage() {

  const location = useLocation();

  //Logic to pass carbon footprint calculation to homepage.
  const data: {totalFootprint: number} = location.state as {totalFootprint: number};

  return (
    <>
    { data.totalFootprint  ?
      <Offset footprint={data.totalFootprint}/> :
      <Homepage/>
    }    
    </>
  )
}

export default LandingPage