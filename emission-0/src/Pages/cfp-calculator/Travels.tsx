import { Hash } from 'crypto'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CalcNavButtons from '../../components/CalcNavButtons'
import AirportInput from '../../components/Travels/AirportInput'
import {FlightInfo} from '../../components/Travels/FlightInfo'
import Service from '../../utils/Service'

let id = 0;

function Travels() {
  const [inputArray, setInputArray] = useState<FlightInfo[]>([])

  // const location: any = useLocation();
  // //Properties of diet: dietChoice, coffeeDrinker, consumption (line 42: Diet.tsx)
  // const diet = location.state?.data.diet;


  const handleAddFlight = () => {
    setInputArray(inputArray.concat([{from: '', to: '', id,  del: false}]))
    id++
  }

  const handleRemoveFlight = (flightInfo: FlightInfo) => {
    flightInfo.del = true;
    setInputArray(inputArray.filter((flight, index, array) => {
      console.log(array)
      return !flight.del 
    }));              
  }

  const handleInputSelect = (component: string, value: string, flightInfo: FlightInfo) => {
      const newArr: any = inputArray.map((input: FlightInfo, index) => {
        if (input.id == flightInfo.id) {
          if (component == 'from') {
            input.from = value;
          } else {
            input.to = value;
          }
        }
        return input;
      })
      setInputArray(newArr);
  }

  useEffect(() => {

  }, [inputArray])

  return (
    <div>
      <h1>Travels</h1>
      <h2>Add flights you took in the past year</h2>
      <button onClick={handleAddFlight}>Add flight</button>
      {inputArray.length > 0 ? inputArray.map((flightInfo, index) => 
        <AirportInput key={flightInfo.id} handleRemoveFlight={handleRemoveFlight} flightInfo={flightInfo} handleInputSelect={handleInputSelect}/>
        ) : null}
        <h3>{Service.diet}</h3>
      <CalcNavButtons back={'/diet'} next={'/electricity'} />
    </div>
  )
}

export default Travels