import { Hash } from 'crypto'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CalcNavButtons from '../../components/CalcNavButtons'
import AirportInput from '../../components/Travels/AirportInput'
import {FlightInfo} from '../../utils/FlightInfo'
import {Carbon} from '../../utils/Carbon'
import { Button, ButtonGroup } from '@chakra-ui/react'


function Travels(props: {handleAddFlight: any, handleRemoveFlight: any, handleInputSelect: any, inputArray: any}) {
 
  const {handleAddFlight, handleRemoveFlight, handleInputSelect, inputArray} = props;


  return (
    <div>
      <h1>Travels</h1>
      <h2>Add flights you took in the past year</h2>
      <button onClick={handleAddFlight}>Add flight</button>
      {inputArray.length > 0 ? inputArray.map((flightInfo: FlightInfo) => 
        <AirportInput key={flightInfo.id} handleRemoveFlight={handleRemoveFlight} flightInfo={flightInfo} handleInputSelect={handleInputSelect}/>
        ) : null}
        <h3>{Carbon.diet}</h3>
      {/* <CalcNavButtons back={'/diet'} next={'/electricity'} setCurrent={setCurrent} /> */}
    </div>
  )
}

export default Travels