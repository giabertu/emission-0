import React, { useState } from 'react';
import './Diet.css'
import { useNavigate } from 'react-router-dom';
import DietButtons from '../../components/Diet/DietButtons';
import ConsumptionInput from '../../components/Diet/ConsumptionInput';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import InputNumberChangeEvent from 'antd/es/input-number'
import CalcNavButtons from '../../components/CalcNavButtons';

function Diet() {
  const navigate = useNavigate()
  const [dietChoice, setDietChoice] = useState('')
  const [coffeDrinker, setCoffeDrinker] = useState(false)
  //add consumption state
  const [consumption, setConsumption] = useState(100)


  const handleDietChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    //set diet choice to either 'Omnivore, Vegetarian or Vegan'
    setDietChoice(e.target.value);
  }
  const handleCheckbox = (e:  CheckboxChangeEvent) => {
    setCoffeDrinker(!coffeDrinker);
  }
  const handleConsumption = (value: number) => {
    setConsumption(value);
  }

  return (
    <div className='Diet'>
      <h1>Diet</h1>
      <h2>What kind of diet do you follow?</h2>
      <DietButtons handleDietChoice={handleDietChoice} /> 
      <Checkbox onChange={handleCheckbox}>I drink coffee regularly</Checkbox>
      <ConsumptionInput handleConsumption={handleConsumption} dietChoice={dietChoice}/>
      <CalcNavButtons back={'/cfp-calculator'} next={'/travels'} />
    </div>
  )
}

export default Diet


//https://ant.design/components/checkbox/
//https://ant.design/components/radio/
//https://ant.design/components/input-number/
