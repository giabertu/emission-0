import { Button } from 'antd';
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import { ApiCarbon } from '../ApiServices/ApiCarbon';
import { ApiOffset } from '../ApiServices/ApiOffset';
import { ApiServer } from '../ApiServices/ApiServer';
import StatisticComponent from '../components/StatisticComponent';
import { DbDoc } from '../utils/DbDocType';
import './Offset.css'

function Offset(props: {footprint: number}) {

  const {footprint} = props;

  const [priceEstimate, setPriceEstimate] = useState(0);
  const [checkoutURL, setCheckoutURL] = useState('')
  const [footprintArr, setFootprintArr] = useState<DbDoc[]>([])
  const navigate = useNavigate();

  function getCalculatedSoFar() {
    return footprintArr.reduce((prev: number, current: DbDoc) => {
      if (current.footprint){
        return prev + current.footprint;
      }
      return prev;
    }, 0)
  }

  useEffect(() => {
    (async () => {
      const footprintsArray = await ApiServer.getFootprints()
      console.log(footprintsArray);
      setFootprintArr(footprintsArray)
    })();
  }, [])
  
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
    <div id='Offset'>
      <h1>Results:</h1>
      {/* <h1>Total carbon footprint: <span className='important-text'><CountUp end={footprint} duration={1.2}/> kg</span> equivalent of CO2 emissions</h1> 
      <div className='flex-container'>
        <h2>You can offset your carbon footprint with circa <span className=' important-text price-estimate'>€<CountUp end={priceEstimate} duration={1} delay={1}/></span></h2>
        <a href={checkoutURL}><Button type="primary" shape="round" size={'large'}>Offset now</Button></a>
      </div> */}
      <div className='results-container'>
        <StatisticComponent title={'Your carbon footprint'} value={footprint} suffix='kg' />
        <StatisticComponent title={'Offset price estimate'} value={priceEstimate} prefix='€' /> 
      </div>
      <div className='flex-container button-container'>
        <a href={checkoutURL}><Button type="primary" shape="round" size={'large'}>Offset now</Button></a>
        <Button type="primary" shape="round" size={'large'} onClick={() => {
          navigate('/')
        }}>Back home</Button>
      </div>
{/*       <div className='statistics-container'>
        <StatisticComponent title={'Total CO2 calculated'} value={getCalculatedSoFar()} suffix='kg'/>
      </div> */}
    </div>
  )
}

export default Offset