// import { Steps} from "antd";
// import { useNavigate } from "react-router-dom"
// import CalcNavButtons from "../../components/CalcNavButtons";
import React, { useEffect, useState } from "react"
import Diet from "../../components/Diet/Diet"
import Travels from "../../components/Travels/Travels"
import Electricity from "../../components/Electricity/Electricity"
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider } from '@chakra-ui/react'
import './Calculator.css'
import {Carbon} from '../../utils/Carbon'
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { FlightInfo } from "../../utils/FlightInfo";
import {ApiCarbon} from '../../ApiServices/ApiCarbon'
import uniqid from 'uniqid'
import { isNamedExports } from "typescript";
import { Button } from "antd";
import { Link } from "react-router-dom";


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
  const [country, setCountry] = useState('')
  const [bedrooms, setBedrooms] = useState<number>(0);

  function handleHouseholdButton (e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e.currentTarget.innerText)
    setBedrooms(Number(e.currentTarget.innerText[0]))
  }

  function handleCountryInput(value: string, option: {value: string, code: string}) {
    setCountry(option.code);
  }

  /***********DONE BUTTON STATE LOGIC*********/
  const [showDone, setShowDone] = useState<boolean>(false)

  function handleTabChange (index: number) {
    if (index === 2) {
      setShowDone(true);
    }
  }

  //HELPER FUNCTION
  function calcAndSetFootprint() {
    Carbon.calcDietFooprint({dietChoice, coffeeDrinker, consumption});
    setTotalFootprint(Carbon.calcTotalFootprint()); 
  }
  
  //Everytime state changes, recaulculate footprint
  useEffect(() => {
    calcAndSetFootprint();
  }, [dietChoice, coffeeDrinker, consumption])

  useEffect(() => {
    (async () => {
      const estimate = await ApiCarbon.postFlightInfo(inputArray);
      if (estimate){
        const {carbon_kg} = estimate.data.attributes;
        console.log(carbon_kg)
        Carbon.calcTravelsFootprint(Math.floor(carbon_kg));
        calcAndSetFootprint();
      }
    })(); 
  }, [inputArray])


  useEffect(() => {
    (async () => {
      const estimate = await ApiCarbon.postElectricity({bedrooms, country})
      if (estimate) {
        console.log(estimate);
        const {carbon_kg} = estimate.data.attributes;
        console.log(carbon_kg);
        Carbon.calcElectricityFootprint(Math.floor(carbon_kg))
        calcAndSetFootprint();
      }
    })();
  }, [bedrooms, country])
  
  return (
    <>
    <Tabs variant='soft-rounded' colorScheme='blue' onChange={(index) => handleTabChange(index)}>
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
          <Electricity handleHouseholdButton={handleHouseholdButton} handleCountryInput={handleCountryInput}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <h2>Current Carbon Footprint: {totalFootprint}</h2>
    <Link to={'/'} state={{totalFootprint}}>
      {showDone ? <Button type="primary" shape="round" size={'large'}>Done</Button> : null}
    </Link>
    </>
  )
}
