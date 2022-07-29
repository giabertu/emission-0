import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Homepage from './Homepage';
import Offset from './Offset';

function LandingPage() {

  const location = useLocation();

  //Logic to pass carbon footprint calculation to homepage.
  const data: {totalFootprint: number} = location.state as {totalFootprint: number};
  console.log(data.totalFootprint);
  const footprint = data.totalFootprint;

  return (
    <>
    { footprint  ?
      <Offset footprint={footprint}/> :
      <Homepage/>
    }    
    </>
  )
}

export default LandingPage