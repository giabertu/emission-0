import React, { useEffect, useState } from 'react';
import './Diet.css'
import DietButtons from '../../components/Diet/DietButtons';
import ConsumptionInput from '../../components/Diet/ConsumptionInput';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import CalcNavButtons from '../../components/CalcNavButtons';
import Carbon from '../../utils/Service';

function Diet() {
  const [dietChoice, setDietChoice] = useState('')
  const [coffeeDrinker, setCoffeDrinker] = useState(false)
  const [consumption, setConsumption] = useState(100);
  const [carbon, setCarbon] = useState(0)
  
  // const [carbonFootprint, setCarbonFootprint] = useState(0);
  
  const handleDietChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    //set diet choice to either 'Omnivore, Vegetarian or Vegan'
    setDietChoice(e.target.value);
    setCarbon(Carbon.calcDietFooprint({dietChoice, coffeeDrinker, consumption}))
  }
  const handleCheckbox = (e:  CheckboxChangeEvent) => {
    setCoffeDrinker(!coffeeDrinker);
    setCarbon(Carbon.calcDietFooprint({dietChoice, coffeeDrinker, consumption}))
  }
  const handleConsumption = (value: number) => {
    setConsumption(value);
    setCarbon(Carbon.calcDietFooprint({dietChoice, coffeeDrinker, consumption}))
  }

  useEffect(() => {
    setCarbon(Carbon.calcDietFooprint({dietChoice, coffeeDrinker, consumption}));
  })

  return (
    <div className='Diet'>
      <h1>Diet</h1>
      <h2>What kind of diet do you follow?</h2>
      <DietButtons handleDietChoice={handleDietChoice} /> 
      <Checkbox onChange={handleCheckbox}>I drink coffee regularly</Checkbox>
      <ConsumptionInput handleConsumption={handleConsumption} dietChoice={dietChoice}/>
      <h3>Current yearly footprint: {Carbon.diet} kg</h3>
      <CalcNavButtons back={'/cfp-calculator'} next={'/travels'} 
      data={{diet: {dietChoice, coffeeDrinker, consumption}}}/>
    </div>
  )
}

export default Diet


//https://ant.design/components/checkbox/
//https://ant.design/components/radio/
//https://ant.design/components/input-number/
