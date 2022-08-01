import React, { Suspense, useEffect, useState } from 'react';
import './Diet.css'
import DietButtons from '../../components/Diet/DietButtons';
import ConsumptionInput from '../../components/Diet/ConsumptionInput';
import { Checkbox } from 'antd';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { MeatModel } from '../../MeatModel';
import { DietChoiceModel } from '../../OmnivoreModel';
import { CoffeeModel } from '../../CoffeeModel';
import { FruitBowlModel } from '../../FruitBowlModel';



function Diet(props: {handleDietChoice: any, handleCheckbox: any, handleConsumption: any, dietState: {dietChoice: string, coffeeDrinker: boolean, consumption: number}}) {
  
  
  const {handleDietChoice, handleCheckbox, handleConsumption, dietState} = props;
  const {dietChoice, coffeeDrinker, consumption} = dietState;
  
  useEffect(() => {
    // setCarbon(Carbon.calcDietFooprint({dietChoice, coffeeDrinker, consumption}));
  })

  return (
    <div className='calculator-component'>
      <div className='calculator-html'>
 {/*        <h1>Diet</h1> */}
        <h2>Choose your diet:</h2>
        <DietButtons handleDietChoice={handleDietChoice} /> 
        <Checkbox onChange={handleCheckbox}><span className='checkbox'>Coffee drinker <span id='coffee-emoji'>☕</span></span></Checkbox>
        <ConsumptionInput handleConsumption={handleConsumption} dietChoice={dietChoice}/>
      </div>
      <div className='calculator-canvas-div'> 
        <Canvas camera={{position: [0,3, 10]}}>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true}  autoRotate={true} autoRotateSpeed={4.0} target={[0, 0, 0]} /* minPolarAngle={0} maxPolarAngle={0} *//>
            <ambientLight intensity={0.5} />
            <directionalLight
              color={"white"}
              intensity={0.5}
              position={[-20, 100, 50]}
              />
            <Suspense 
            fallback={null}>
                <DietChoiceModel dietChoice={dietChoice} fruitPosition={[0,-0.9,0.25]} milkPosition={[1.5, -0.7, 1.9]} meatPosition={[0,0.3,0]} cheesePosition={[1.5,-0.8,-1.9]}/>
              { coffeeDrinker ? 
                <CoffeeModel position={[4,-0.5,0]}/> : null
              }
            </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default Diet


//https://ant.design/components/checkbox/
//https://ant.design/components/radio/
//https://ant.design/components/input-number/
