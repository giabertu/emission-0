import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { ApiCarbon } from '../ApiServices/ApiCarbon';
import { ApiOffset } from '../ApiServices/ApiOffset';
import { ApiServer } from '../ApiServices/ApiServer';
import './Offset.css'

function Offset(props: {footprint: number}) {

  const {footprint} = props;

  const [priceEstimate, setPriceEstimate] = useState(0);
  const [checkoutURL, setCheckoutURL] = useState('')
  
  useEffect(() => {
    (async () => {
      const estimate = await ApiOffset.getPrice(footprint)
      console.log(estimate);
      setPriceEstimate(estimate.priceEUR);
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const url = await ApiOffset.getCompensate(footprint)
      console.log(url)
      setCheckoutURL(url);
    })()
  }, [])

  return (
    <div className='Offset'>
      <h1>Your total carbon footprint: <CountUp end={footprint} duration={1.2}/> kg-CO2 emissions</h1> 
      { priceEstimate ?
        <div>
          <p>You can offset your carbon footprint with <span className='price-estimate'>€<CountUp end={priceEstimate} duration={1} delay={1.5}/></span></p>
          <a href={checkoutURL}><Button type="primary" shape="round" size={'large'}>Offset now</Button></a>
        </div> : null 
      }
    </div>
  )
}

export default Offset