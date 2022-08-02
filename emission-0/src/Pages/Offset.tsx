import { Button } from 'antd';
import { motion } from 'framer-motion';
import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ApiOffset } from '../ApiServices/ApiOffset';
import { ApiServer } from '../ApiServices/ApiServer';
import StatisticComponent from '../components/StatisticComponent';
import { DbDoc } from '../utils/DbDocType';
import './Offset.css'

function Offset(props: {footprint: {dietFootprint : number, travelsFootprint: number, electricityFootprint: number}}) {

  const {dietFootprint, travelsFootprint, electricityFootprint} = props.footprint;

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

  function getAverageFootprint() {
    return getCalculatedSoFar() / footprintArr.length;
  }

  function getPercentage() {
    const initialPerc = ((dietFootprint + travelsFootprint + electricityFootprint) / getAverageFootprint()) * 100;
    if (initialPerc >= 100) {
      return ['up', Math.round(initialPerc) - 100]
    } else {
      const diff = 100 - initialPerc;
      return ['down', diff]
    }
  }
  function getPercentageValue(): number | string {
    const array = getPercentage();
    return array[1];
  }
  function getPercentageOrientation() {
    return getPercentage()[0]
  }

  function getPieChartData() {
    let arr: {title: string, value: number, color: string}[] = [];
    let [dietColor, travelsColor, electricityColor] = ['', '', '']
    if (dietFootprint >= travelsFootprint && dietFootprint >= electricityFootprint){
      dietColor = '#ff9900';
      if (travelsFootprint >= electricityFootprint) {
        travelsColor = '#ffe000';
        electricityColor ='#95e214';
      } else {
        electricityColor = '#ffe000';
        travelsColor = '#95e214';
      }
    } else if (travelsFootprint >= dietFootprint && travelsFootprint >= electricityFootprint){
      travelsColor = '#ff9900';
      if (dietFootprint >= electricityFootprint) {
        dietColor = '#ffe000';
        electricityColor ='#95e214';
      } else {
        electricityColor = '#ffe000';
        dietColor = '#95e214';
      }
    } else {
      electricityColor = '#ff9900';
      if (travelsFootprint >= dietFootprint) {
        travelsColor = '#ffe000';
        dietColor ='#95e214';
      } else {
        dietColor = '#ffe000';
        travelsColor = '#95e214';
      }
    }
    return [
       {
        title: '🥗',
        value: dietFootprint,
        color: dietColor
      },
      {
        title: '✈️',
        value: travelsFootprint,
        color: travelsColor
      }, 
      {
        title: '⚡️',
        value: electricityFootprint,
        color: electricityColor
      },  
    ]
  }

  useEffect(() => {
    (async () => {
      const footprintsArray = await ApiServer.getFootprints()
      setFootprintArr(footprintsArray)
    })();
  }, [])
  
  useEffect(() => {
    (async () => {
      const estimate = await ApiOffset.getPrice(dietFootprint +travelsFootprint+electricityFootprint)
      setPriceEstimate(estimate.priceEUR);
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const url = await ApiOffset.getCompensate(dietFootprint +travelsFootprint+electricityFootprint)
      setCheckoutURL(url);
    })()
  }, [])

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    id='Offset'>
      <h1>Results:</h1>
      <div className='res-statistics-container'>
        <div className='results-container'>
          <StatisticComponent title={'Your carbon footprint'} value={dietFootprint +travelsFootprint+electricityFootprint} suffix='kg' />
          <StatisticComponent title={'Offset price estimate'} value={priceEstimate} prefix='€' />
          <StatisticComponent title={'Compared to average'} value={getPercentageValue()} prefix={getPercentageOrientation() === 'up' ? '↑' : '⬇️'} className={getPercentageOrientation() === 'up' ? ' red-statistic' : '' } suffix='%' />
        </div>
          <StatisticComponent title={'Footprint distribution'} value={0} pieChart={true} data={getPieChartData()}/>
      </div>
      <motion.div className='flex-container button-container'>
        <a href={checkoutURL}><Button type="primary" shape="round" size={'large'}>Offset now</Button></a>
        <Button type="primary" shape="round" size={'large'} onClick={() => {
          navigate('/')
        }}>Back home</Button>
      </motion.div>
    </motion.div>
  )
}

export default Offset