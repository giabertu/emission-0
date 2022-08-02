import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ApiServer } from '../ApiServices/ApiServer';
import Homepage from './Homepage';
import Offset from './Offset';

function LandingPage() {
  const location = useLocation();
  const data: {data: {dietFootprint: number, travelsFootprint: number, electricityFootprint: number}} = location.state as {data: {dietFootprint: number, travelsFootprint: number, electricityFootprint: number}};

  
  //Logic to pass carbon footprint calculation to homepage.

  return (
    <>
    { data ?
      <Offset footprint={data.data}/> :
      <Homepage/>
    }    
    </>
  )
}

export default LandingPage