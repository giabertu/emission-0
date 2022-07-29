// import { Steps} from "antd";
// import { useNavigate } from "react-router-dom"
// import CalcNavButtons from "../../components/CalcNavButtons";
import React, { useEffect, useState } from "react"
import Diet from "./Diet";
import Electricity from "./Electricity";
import Travels from "./Travels";
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider } from '@chakra-ui/react'
import './Calculator.css'
import {Service} from '../../utils/Service'
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { FlightInfo } from "../../components/Travels/FlightInfo";

let id = 0;

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
    setInputArray(inputArray.concat([{from: '', to: '', id,  del: false}]))
    id++
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
  


  //HELPER FUNCTION
  function calcAndSetFootprint() {
    Service.calcDietFooprint({dietChoice, coffeeDrinker, consumption});
    Service.calcTravelsFootprint();
    Service.calcElectricityFootprint();
    setTotalFootprint(Service.calcTotalFootprint()); 
  }
  
  //Everytime state changes, recaulculate footprint
  useEffect(() => {
    calcAndSetFootprint();
  }, [dietChoice, coffeeDrinker, consumption, inputArray])

  
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
          <Electricity/>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <h2>Current Carbon Footprint: {totalFootprint}</h2>
    </>
  )
}


//const [current, setCurrent] = useState<number>(0);
// return (
//   <div className="CalculatorApp">
//     {current === 0 ? 
//     <Diet setCurrent={setCurrent}/> : null  
//     }
//     {current === 1 ?
//     <Travels setCurrent={setCurrent}/> : null  
//     }
//     {current === 2 ? 
//     <Electricity setCurrent={setCurrent}/> : null
//     }
//   </div>
//   )