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
import { Button, notification } from "antd";
import { Link } from "react-router-dom";
import { ApiServer } from "../../ApiServices/ApiServer"
import { motion } from "framer-motion"


//Unique id for new FlightInfo objects (updated at line 44)

export function Calculator() {
 
  /***********TOTAL FOOTPRINT STATE LOGIC ***********/
  const [dietFootprint, setDietFootprint] = useState(0);
  const [travelsFootprint, setTravelsFootprint] = useState(0);
  const [electricityFootprint, setElectricityFootprint] = useState(0)

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
    if (inputArray.length < 4) {
      setInputArray(inputArray.concat([{from: '', to: '', id: uniqid(),  del: false}]))
    } else {
      alert('Too many flights')
    }
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
    setBedrooms(Number(e.currentTarget.innerText[0]))
  }

  function handleCountryInput(value: string, option: {value: string, code: string}) {
    setCountry(option.code);
  }

  /***********DONE BUTTON STATE LOGIC*********/
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [showCalculate, setshowCalculate] = useState<boolean>(false);
  const [canCalculate, setCanCalculate] = useState<boolean>(false);

  function canCalculateSetter() {
    if (dietChoice == '' || country == '' || bedrooms == 0) return;
    let can = true;
    inputArray.forEach((flight) => {
      if (flight.from && flight.to){
        return;
      } else {
        can = false;
      }
    })
    setCanCalculate(can)
  }

  const openNotification = () => {
    notification.error({
      message: 'Error',
      description:
        'Please make sure that all input fields are filled out correctly.',
      maxCount: 2
    });
  };

  function handleTabChange (index: number) {
    if (index === 2){
      setshowCalculate(true);
    }
    setTabIndex(index);
  }

  async function postFootprint() {
    await ApiServer.postFootprint(dietFootprint + travelsFootprint + electricityFootprint);
  }

  //HELPER FUNCTION
  function calcAndSetFootprint() {
    setDietFootprint(Carbon.calcDietFooprint({dietChoice, coffeeDrinker, consumption}));
  }


  //Everytime state changes, recaulculate footprint
  useEffect(() => {
    calcAndSetFootprint();
    canCalculateSetter();
  }, [dietChoice, coffeeDrinker, consumption])

  useEffect(() => {
    (async () => {
      const estimate = await ApiCarbon.postFlightInfo(inputArray);
      if (estimate){
        const {carbon_kg} = estimate.data.attributes;
        setTravelsFootprint(Math.floor(carbon_kg));
        calcAndSetFootprint();
        canCalculateSetter();
      }
    })(); 
  }, [inputArray])


  useEffect(() => {
    (async () => {
      const estimate = await ApiCarbon.postElectricity({bedrooms, country})
      if (estimate) {
        const {carbon_kg} = estimate.data.attributes;
        setElectricityFootprint(Math.floor(carbon_kg))
        calcAndSetFootprint();
        canCalculateSetter()
      }
    })();

  }, [bedrooms, country])
  
  return (
    <>
    <motion.div 
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    id='Calculator'>
{/*       {tabIndex === 1 ? 
        <img src={Travels_bg2} className='background-img spotlight' /> : null } */}

      <Tabs variant='soft-rounded' colorScheme='blue' onChange={(index) => handleTabChange(index)}>
          <TabList>
            <Tab className={tabIndex == 0 ? "tab selected-tab" : 'tab'}>Diet</Tab>
            <Tab className={tabIndex == 1 ? "tab selected-tab" : 'tab'}>Travels</Tab>
            <Tab className={tabIndex == 2 ? "tab selected-tab" : 'tab'}>Electricity</Tab>
          </TabList>

        <TabPanels>
          <TabPanel>
            <Diet handleDietChoice={handleDietChoice} handleCheckbox={handleCheckbox} handleConsumption={handleConsumption} dietState={{dietChoice, coffeeDrinker, consumption}}/>
          </TabPanel>

          <TabPanel>
            <Travels handleAddFlight={handleAddFlight} handleRemoveFlight={handleRemoveFlight} handleInputSelect={handleInputSelect} inputArray={inputArray}/>
          </TabPanel>

          <TabPanel>
            <Electricity handleHouseholdButton={handleHouseholdButton} handleCountryInput={handleCountryInput} electricityState={{bedrooms}}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Link to={canCalculate ? '/' : '/cfp-calculator'} 
        onClick={() => canCalculate ? postFootprint() : openNotification()}
        state={{data: {dietFootprint, travelsFootprint, electricityFootprint}}}>
        <div className='calc-button-container'>
           {showCalculate ? <Button id='calculate-button' type="primary" shape="round" size={'large'}>Calculate</Button> : null}
        </div>
      </Link>
    </motion.div>
    </>
  )
}
