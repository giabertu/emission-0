import React, { Suspense, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import EarthModel from '../components/models/EarthModel'
import './Homepage.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls  } from '@react-three/drei'
import Clouds from './Clouds_bg.svg';
import Typewriter from 'typewriter-effect';
import { ApiServer } from '../ApiServices/ApiServer'
import {DbDoc} from '../utils/DbDocType'
import StatisticComponent from '../components/StatisticComponent'
import { motion } from 'framer-motion'




function Homepage() {
  const navigate = useNavigate()
  const location = useLocation();
  const [footprintArr, setFootprintArr] = useState<DbDoc[]>([])

  function getCalculatedSoFar() {
    return footprintArr.reduce((prev: number, current: DbDoc) => {
      if (current.footprint){
        return prev + current.footprint;
      }
      return prev;
    }, 0)
  }

  useEffect(() => {
    (async () => {
      const footprintsArray = await ApiServer.getFootprints()
      setFootprintArr(footprintsArray)
    })();
  }, [])

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
/*     whileInView={{opacity: 1}} */
    className='Homepage'>

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
        <button className='call-to-action-button' onClick={() => {navigate('/cfp-calculator')}}>Start</button>
      </div>

      <div className='canvas-div'> 
        <Canvas camera={{position: [0, 95, 8]}}>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} enableRotate={true} target={[30, -5, 0]} minPolarAngle={0} maxPolarAngle={0}/>
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
      <div className='statistics-container'>
        <StatisticComponent title='Total CO2 estimated' value={getCalculatedSoFar()} suffix='kg'/>
      </div>
    </motion.div>
  )
}

export default Homepage