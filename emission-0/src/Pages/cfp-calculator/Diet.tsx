import React, { useEffect, useState } from 'react';
import './Diet.css'
import DietButtons from '../../components/Diet/DietButtons';
import ConsumptionInput from '../../components/Diet/ConsumptionInput';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import CalcNavButtons from '../../components/CalcNavButtons';
import {Service} from '../../utils/Service';

function Diet(props: {handleDietChoice: any, handleCheckbox: any, handleConsumption: any, dietChoice: any}) {

  const {handleDietChoice, handleCheckbox, handleConsumption, dietChoice} = props;

  useEffect(() => {
    // setCarbon(Service.calcDietFooprint({dietChoice, coffeeDrinker, consumption}));
  })

  return (
    <div className='Diet'>
      <h1>Diet</h1>
      <h2>What kind of diet do you follow?</h2>
      <DietButtons handleDietChoice={handleDietChoice} /> 
      <Checkbox onChange={handleCheckbox}>I drink coffee regularly</Checkbox>
      <ConsumptionInput handleConsumption={handleConsumption} dietChoice={dietChoice}/>
      {/* <CalcNavButtons back={'/cfp-calculator'} next={'/travels'} setCurrent={setCurrent} exit={'/'}/> */}
    </div>
  )
}

export default Diet


//https://ant.design/components/checkbox/
//https://ant.design/components/radio/
//https://ant.design/components/input-number/
