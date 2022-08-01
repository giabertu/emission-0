import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ApiServer } from '../ApiServices/ApiServer';
import Homepage from './Homepage';
import Offset from './Offset';

function LandingPage() {
  const [footprint, setFootprint] = useState<number | undefined>(undefined)
  const location = useLocation();
  const data: {totalFootprint: number} = location.state as {totalFootprint: number};

  
  //Logic to pass carbon footprint calculation to homepage.

  return (
    <>
    { data ?
      <Offset footprint={data.totalFootprint}/> :
      <Homepage/>
    }    
    </>
  )
}

export default LandingPage