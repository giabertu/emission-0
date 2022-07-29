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

export function Calculator() {
 
  /***********TOTAL FOOTPRINT STATE LOGIC ***********/
  const [totalFootprint, setTotalFootprint] = useState(0)

  /***********DIET STATE LOGIC ***********/
  const [dietChoice, setDietChoice] = useState('')
  const [coffeeDrinker, setCoffeDrinker] = useState(false)
  const [consumption, setConsumption] = useState(100);

  //HELPER FUNCTION
  function calcDietAndFootprint() {
    Service.calcDietFooprint({dietChoice, coffeeDrinker, consumption});
    setTotalFootprint(Service.calcTotalFootprint()); 
  }

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
  
  
  //Everytime state changes, recaulculate footprint
  useEffect(() => {
    calcDietAndFootprint();
  }, [dietChoice, coffeeDrinker, consumption])





  
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
          <Travels/>
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