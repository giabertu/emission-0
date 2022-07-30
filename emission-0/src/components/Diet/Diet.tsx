import React, { Suspense, useEffect, useState } from 'react';
import './Diet.css'
import DietButtons from '../../components/Diet/DietButtons';
import ConsumptionInput from '../../components/Diet/ConsumptionInput';
import { Checkbox } from 'antd';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

function Diet(props: {handleDietChoice: any, handleCheckbox: any, handleConsumption: any, dietChoice: any}) {

  const {handleDietChoice, handleCheckbox, handleConsumption, dietChoice} = props;

  useEffect(() => {
    // setCarbon(Carbon.calcDietFooprint({dietChoice, coffeeDrinker, consumption}));
  })

  return (
    <div className='calculator-component'>
      <div className='calculator-html'>
 {/*        <h1>Diet</h1> */}
        <h2>Choose your diet:</h2>
        <DietButtons handleDietChoice={handleDietChoice} /> 
        <Checkbox onChange={handleCheckbox}><span className='checkbox'>I drink coffee regularly</span></Checkbox>
        <ConsumptionInput handleConsumption={handleConsumption} dietChoice={dietChoice}/>
      </div>
      <div className='calculator-canvas-div'> 
        <Canvas camera={{position: [0, 0, 15]}}>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} target={[0, 0, 0]} /* minPolarAngle={0} maxPolarAngle={0} *//>
            <ambientLight intensity={0.5} />
            <directionalLight
              color={"white"}
              intensity={0.5}
              position={[-20, 100, 50]}
              />
            <Suspense 
            fallback={null}>
              {/*Missing model  */}
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
