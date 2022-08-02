import { Suspense } from 'react'

import AirportInput from '../../components/Travels/AirportInput'
import {FlightInfo} from '../../utils/FlightInfo'
import { OrbitControls, Plane } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {PlaneModel} from '../models/PlaneModel'
import './Travels.css'

function Travels(props: {handleAddFlight: any, handleRemoveFlight: any, handleInputSelect: any, inputArray: any}) {
 
  const {handleAddFlight, handleRemoveFlight, handleInputSelect, inputArray} = props;


  return (
    <div className='calculator-component'>
      <div className='calculator-html'>
        <h2>Add flights you took in the past year</h2>
        <button className='calculator-button' onClick={handleAddFlight}>Add flight</button>
        {inputArray.length > 0 ? inputArray.map((flightInfo: FlightInfo) => 
          <AirportInput key={flightInfo.id} handleRemoveFlight={handleRemoveFlight} flightInfo={flightInfo} handleInputSelect={handleInputSelect}/>
          ) : null}
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
              {inputArray.length > 0 ? 
              inputArray.map((element: any, index: number) => {
                if (index === 0) {
                  return <PlaneModel position={[0, 6, 0]}/>
                }
                if (index === 1) {
                  return <PlaneModel position={[0,1,0]}/>
                }
                if (index === 2) {
                  return <PlaneModel position={[0, -4, 0]}/>
                }
                if (index === 3) {
                  return <PlaneModel position={[0, -9, 0]}/>
                }
              }) : null
            }
            </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default Travels