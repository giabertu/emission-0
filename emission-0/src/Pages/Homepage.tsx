import React, { Suspense } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import EarthModel from '../EarthModel'
import './Homepage.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls  } from '@react-three/drei'
import Clouds from './Clouds_bg.svg';
import Typewriter from 'typewriter-effect';
import { Space, Spin } from 'antd';

function Homepage() {
  const navigate = useNavigate()
  const location = useLocation();


  return (
    <div className='Homepage'>

      <div className='homepage-html'>
        <h1 id='title'>eMission 0</h1>
        <h2 id='typewriter'>
          <Typewriter
            options={{
              strings: ['Calculate your carbon footprint', 'Offset your footprint'],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
            />
          </h2>
        <button id='start-button' onClick={() => {navigate('/cfp-calculator')}}>Start</button>
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
            <Suspense 
            fallback={null}>
              <EarthModel/>
            </Suspense>
        </Canvas>
      </div>
      <img className='background-img' src={Clouds} />
    </div>
  )
}

export default Homepage