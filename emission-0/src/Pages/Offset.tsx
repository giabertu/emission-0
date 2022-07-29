import React, { useEffect, useState } from 'react'
import { ApiService } from '../utils/ApiService';

function Offset(props: {footprint: number}) {

  const [priceEstimate, setPriceEstimate] = useState(0);

  const {footprint} = props;

  // useEffect(() => {
  //   (async () => {
  //     const estimate = await ApiService.
  //   })
  // }, [])

  return (
    <div className='Offset'>
      <h1>Your total carbon footprint: {footprint} kg CO2 emissions</h1>
      <h2>You can offset your carbon footprint with {priceEstimate}</h2>
    </div>
  )
}

export default Offset