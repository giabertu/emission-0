// import { Steps} from "antd";
// import { useNavigate } from "react-router-dom"
// import CalcNavButtons from "../../components/CalcNavButtons";
import React, { useEffect, useState } from "react"
import Diet from "./Diet";
import Electricity from "./Electricity";
import Travels from "./Travels";
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider } from '@chakra-ui/react'
import './Calculator.css'
import {Carbon} from '../../utils/Carbon'
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { FlightInfo } from "../../utils/FlightInfo";
import {ApiService} from '../../utils/ApiService'
import uniqid from 'uniqid'


//Unique id for new FlightInfo objects (updated at line 44)

export function Calculator() {
 
  /***********TOTAL FOOTPRINT STATE LOGIC ***********/
  const [totalFootprint, setTotalFootprint] = useState(0)

  /***********DIET STATE LOGIC ***********/
  const [dietChoice, setDietChoice] = useState('')
  const [coffeeDrinker, setCoffeDrinker] = useState(false)
  const [consumption, setConsumption] = useState(100);

  
  //set diet choice to either 'Omnivore, Vegetarian or Vegan'
  function handleDietChoice(e: React.ChangeEvent<HTMLInputElement>) {
    setDietChoice(e.target.value);
  }
  function handleCheckbox (e:  CheckboxChangeEvent){
    setCoffeDrinker(!coffeeDrinker);
  }
  function handleConsumption(value: number) {
    setConsumption(value);
  }
  
  /***********TRAVELS STATE LOGIC ***********/
  const [inputArray, setInputArray] = useState<FlightInfo[]>([])
  
  function handleAddFlight(){
    setInputArray(inputArray.concat([{from: '', to: '', id: uniqid(),  del: false}]))
  }

  function handleRemoveFlight(flightInfo: FlightInfo) {
    flightInfo.del = true;
    setInputArray(inputArray.filter((flight) => {
      return !flight.del 
    }));              
  }

  function handleInputSelect (component: string, value: string, flightInfo: FlightInfo) {
    const newArr: any = inputArray.map((input: FlightInfo) => {
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

  /***********ELECTRICITY STATE LOGIC ***********/
  const [bedrooms, setBedrooms] = useState<number>(0);

  function handleHouseholdButton (e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e.currentTarget.innerText)
    setBedrooms(Number(e.currentTarget.innerText[0]))
  }

  /*********************************************/

  //HELPER FUNCTION
  function calcAndSetFootprint() {
    Carbon.calcDietFooprint({dietChoice, coffeeDrinker, consumption});
    Carbon.calcElectricityFootprint(bedrooms);
    setTotalFootprint(Carbon.calcTotalFootprint()); 
  }
  
  //Everytime state changes, recaulculate footprint
  useEffect(() => {
    calcAndSetFootprint();
  }, [dietChoice, coffeeDrinker, consumption, bedrooms])

  useEffect(() => {
    (async () => {
      const estimate = await ApiService.postFlightInfo(inputArray);
      if (estimate){
        const {carbon_kg} = estimate.data.attributes;
        console.log(carbon_kg)
        Carbon.calcTravelsFootprint(carbon_kg);
        calcAndSetFootprint();
      }
    })(); 
  }, [inputArray])

  
  return (
    <>
    <Tabs variant='soft-rounded' colorScheme='blue'>

        <TabList>
          <Tab className="tab">Diet</Tab>
          <Tab className="tab">Travels</Tab>
          <Tab className="tab">Electricity</Tab>
        </TabList>

      <TabPanels>

        <TabPanel>
          <Diet handleDietChoice={handleDietChoice} handleCheckbox={handleCheckbox} handleConsumption={handleConsumption} dietChoice={dietChoice}/>
        </TabPanel>

        <TabPanel>
          <Travels handleAddFlight={handleAddFlight} handleRemoveFlight={handleRemoveFlight} handleInputSelect={handleInputSelect} inputArray={inputArray}/>
        </TabPanel>

        <TabPanel>
          <Electricity handleHouseholdButton={handleHouseholdButton}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <h2>Current Carbon Footprint: {totalFootprint}</h2>
    </>
  )
}
