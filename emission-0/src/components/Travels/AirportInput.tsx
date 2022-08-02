import { AutoComplete } from 'antd';
import React, { useEffect, useState } from 'react';
import {DataUtil} from '../../utils/DataUtil'
import './AirportInput.css'
import {FlightInfo} from '../../utils/FlightInfo';
import {AiOutlineClose} from 'react-icons/ai';

const data = DataUtil.getCitiesAndCodes();
const options = [
  ...data
];

function AirportInput (props: {handleRemoveFlight: any, flightInfo: FlightInfo, handleInputSelect: any}) {

  const {handleRemoveFlight, handleInputSelect, flightInfo} = props;
  const [valueFrom, setValueFrom] = useState('');
  
  console.log(flightInfo)
  return (
    <div className='AirportInput'>
    <AutoComplete
      backfill={true} 
      allowClear={true}
      style={{ width: 200 }}
      options={options}
      onSelect={(value: string) => handleInputSelect('from', value, flightInfo)}
      placeholder="Departure Airport"
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
    <AutoComplete
      allowClear={true}
      style={{ width: 200}}
      options={options}
      onSelect={(value: string) => handleInputSelect('to', value, flightInfo)}
      placeholder="Arrival Airport"
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
    <button className='del-flight-button' onClick={() => handleRemoveFlight(flightInfo)}><AiOutlineClose/>
      </button>
    </div>
  )
}

export default AirportInput;