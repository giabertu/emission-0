import { position } from '@chakra-ui/react';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react'
import CountryInput from '../../components/Electricity/CountryInput';
import HouseholdButtons from '../../components/Electricity/HouseholdButtons'
import { LightBulbModel } from '../models/LightBulbModel';
import './Electricity.css'

function Electricity(props: {handleHouseholdButton: any, handleCountryInput: any, electricityState: {bedrooms: number}}) {

  const {handleHouseholdButton, handleCountryInput, electricityState} = props;
  const {bedrooms} = electricityState;
  const [bulbPositionArray, setBulbPositionArray] = useState<number[][]>([])

  useEffect(() => {
    setBulbPositionArray(getBulbPositions(bedrooms))
  }, [bedrooms])
  

  function getBulbPositions (bedrooms: number) {
    switch (bedrooms) {
      case 1:
        return [[0,0,0]];
      case 3:
        return [[-2,0,0], [2,0,0]]
      case 4:
        return [[-4,0,0], [0,0,0], [4,0,0]]
      default:
        return [[]];
    }
  }

  return (
    <div className='calculator-component'>
      <div className='calculator-html'>
        {/* <h1>Electricity</h1> */}
        <h2>Choose your country:</h2>
        <CountryInput handleCountryInput={handleCountryInput}/>
        <h2 className='el-h2'>How many bedrooms does the house you live in have?</h2>
        <HouseholdButtons handleHouseholdButton={handleHouseholdButton}/>
      </div>
      <div className='calculator-canvas-div'> 
      <Canvas camera={{position: [0,3, 13]}}>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true}  autoRotate={true} autoRotateSpeed={4.0} target={[0, 0, 0]}/>
            <ambientLight intensity={0.5} />
            <directionalLight
              color={"white"}
              intensity={0.5}
              position={[-20, 100, 50]}
              />
            <Suspense 
            fallback={null}>
              { bulbPositionArray.length > 0 ?
                bulbPositionArray.map((position: any) => {
                return <LightBulbModel position={position} /> 
              }) : null}
            </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default Electricity


// Small house/flat – 1 -2 bedrooms
// A small to medium sized house or flat, with 1 or 2 bedrooms and 3 to 4 people, would use around 8000kWh of gas per year, and 2000kWh of electricity.

// This would mean an average monthly energy bill of £66, or £795 a year.

 

// Medium house - 3-bedroom house
// If your house is a little bigger, say 3 bedrooms and 3 – 4 people, your usage might be more like 12,500kWh of gas per year, and 3100kWh of electricity.

// This would mean an average monthly energy bill of £97 per month, or £1,163 a year.

 

// Large house – 4 or more bedrooms
// For a bigger house with 4 or more bedrooms and 5 people, the average would be around 18,000kWh of gas per year, and 4,600kWh of electricity

// This would mean an average monthly energy bill of £137 per month, or £1,639 a year.