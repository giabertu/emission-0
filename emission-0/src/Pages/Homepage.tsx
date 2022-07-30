import React, { Suspense } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import EarthModel from '../EarthModel'
import './Homepage.css'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Clouds from './Clouds_bg.svg'
import { Button } from 'antd'

function Homepage() {
  const navigate = useNavigate()
  const location = useLocation();

  //Logic to pass carbon footprint calculation to homepage.
  const data: {totalFootprint: number} = location.state as {totalFootprint: number};
  console.log(data.totalFootprint);


  return (
    <div className='Homepage'>
      <div className='homepage-html'>
        <h1 id='title'>eMission-0</h1>
        <Button type="primary" shape="round" size={'large'} onClick={() => {navigate('/cfp-calculator')}}>Start</Button>
      </div>
      <div className='canvas-div'> 
        <Canvas camera={{position: [0, 95, 10]}}>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} enableRotate={true} target={[30, -5, 0]} minPolarAngle={0} maxPolarAngle={0}/>
            {/* <PerspectiveCamera position={[0,200,200]}/> */}
            <ambientLight intensity={0.5} />
            <directionalLight
              color={"white"}
              intensity={0.5}
              position={[-20, 100, 50]}
              />
            <Suspense fallback={null}>
              <EarthModel/>
            </Suspense>
        </Canvas>
      </div>
      <img className='background-img' src={Clouds} />
    </div>
  )
}

export default Homepage