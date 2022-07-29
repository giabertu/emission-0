import { Steps} from "antd";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import CalcNavButtons from "../../components/CalcNavButtons";
import Diet from "./Diet";
import Electricity from "./Electricity";
import Travels from "./Travels";
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider } from '@chakra-ui/react'
import './Calculator.css'

export function Calculator() {

  
  return (
    <Tabs variant='soft-rounded' colorScheme='blue'>

        <TabList>
          <Tab className="tab">Diet</Tab>
          <Tab className="tab">Travels</Tab>
          <Tab className="tab">Electricity</Tab>
        </TabList>

      <TabPanels>

        <TabPanel>
          <Diet/>
        </TabPanel>

        <TabPanel>
          <Travels/>
        </TabPanel>

        <TabPanel>
          <Electricity/>
        </TabPanel>

      </TabPanels>
    </Tabs>
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