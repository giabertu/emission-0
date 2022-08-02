import React, { Suspense, useEffect, useState } from 'react';
import './Diet.css'
import DietButtons from '../../components/Diet/DietButtons';
import ConsumptionInput from '../../components/Diet/ConsumptionInput';
import { Checkbox } from 'antd';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { DietChoiceModel } from '../models/DietChoiceModel';
import { CoffeeModel } from '../models/CoffeeModel';
import { AnimatePresence, motion } from 'framer-motion';



function Diet(props: {handleDietChoice: any, handleCheckbox: any, handleConsumption: any, dietState: {dietChoice: string, coffeeDrinker: boolean, consumption: number}}) {
  
  
  const {handleDietChoice, handleCheckbox, handleConsumption, dietState} = props;
  const {dietChoice, coffeeDrinker, consumption} = dietState;
  
  useEffect(() => {
    // setCarbon(Carbon.calcDietFooprint({dietChoice, coffeeDrinker, consumption}));
  })

  return (
    <div className='calculator-component'>
      <AnimatePresence>
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className='calculator-html'>
          <h2>Choose your diet:</h2>
          <DietButtons handleDietChoice={handleDietChoice} /> 
          <Checkbox onChange={handleCheckbox}><span className='checkbox'>Coffee drinker <span id='coffee-emoji'>☕</span></span></Checkbox>
          <ConsumptionInput handleConsumption={handleConsumption} dietChoice={dietChoice}/>
        </motion.div>
      </AnimatePresence>


      <div className='calculator-canvas-div'> 
        <Canvas camera={{position: [0,3, 10]}}>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true}  autoRotate={true} autoRotateSpeed={4.0} target={[0, 0, 0]} /* enableDamping={true} *//>
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
