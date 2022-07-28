import { Hash } from 'crypto'
import React, { useEffect, useState } from 'react'
import CalcNavButtons from '../../components/CalcNavButtons'
import AirportInput from '../../components/Travels/AirportInput'
import {FlightInfo} from '../../components/Travels/FlightInfo'


let id = 0;

function Travels() {
  const [inputArray, setInputArray] = useState<FlightInfo[]>([])


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
    console.log('Here is the flightInfo ', flightInfo)
      const newArr: any = inputArray.map((input: FlightInfo, index) => {
        console.log('Here is the element of the array: ', input)
        if (input.id == flightInfo.id) {
          if (component == 'from') {
            console.log('Setting from')
            input.from = value;
          } else {
            console.log('Setting to')
            input.to = value;
          }
        }
        return input;
      })
      console.log('Here is the new array ', newArr)
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
      <CalcNavButtons back={'/diet'} next={'/electricity'} />
    </div>
  )
}

export default Travels