import { AutoComplete } from 'antd';
import React, { useEffect, useState } from 'react';
import TravelUtils from '../../utils/util'
import './AirportInput.css'
import {FlightInfo} from './FlightInfo'

const data = TravelUtils.getCitiesAndCodes();
const options = [
  ...data
];

const AirportInput = (props: {handleRemoveFlight: any, flightInfo: FlightInfo, handleInputSelect: any}) => {

  const {handleRemoveFlight, handleInputSelect, flightInfo} = props;
  const [valueFrom, setValueFrom] = useState('');
  // const [valueTo, setValueTo] = useState('');

  // const handleSelect = (component: string, value: string) => {
  //   if (component == 'from') {
  //     flightInfo.from = value;
  //     // setValueFrom(value);
  //   } else {
  //     flightInfo.to = value;
  //     // setValueTo(value);
  //   }
  // }

  // useEffect(() => {
  //   setValueFrom(flightInfo.from)
  //   setValueTo(flightInfo.to)
  // }, [])
  console.log(flightInfo)
  return (
    <div className='AirportInput'>
    <AutoComplete 
      allowClear={true}
      style={{ width: 200 }}
      //defaultValue={flightInfo.from}
      //value={flightInfo.from}
      options={options}
      onSelect={(value: string) => handleInputSelect('from', value, flightInfo)}
      placeholder="Departure Airport"
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
    <AutoComplete
      allowClear={true}
      style={{ width: 200 }}
      //defaultValue={flightInfo.to}
      options={options}
      onSelect={(value: string) => handleInputSelect('to', value, flightInfo)}
      placeholder="Arrival Airport"
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
    <button onClick={() => handleRemoveFlight(flightInfo)}>x</button>
    </div>
  )
}

export default AirportInput;