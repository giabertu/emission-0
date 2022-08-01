import React from 'react';
import 'antd/dist/antd.css';
import { SettingOutlined } from '@ant-design/icons';
import {InputNumber, Select, Space } from 'antd';

const { Option } = Select;

function ConsumptionInput(props : {dietChoice: string, handleConsumption: any}) {
  const dietChoice = props.dietChoice;
  const handleConsumption = props.handleConsumption;

  return (
    <>
    {dietChoice !== 'Vegan' && dietChoice !== '' ? 
      <div id='consumption-input-container'>
        <h3><span className='cheese-and-meat'>Dairy {dietChoice == 'Omnivore' ? <>and meat</> : null}</span> weekly consumption: </h3>
        <InputNumber className='diet-input' onChange={handleConsumption} min={0} max={150000} onStep={() => {}} step={50} addonAfter={'g'} defaultValue={100} />
        </div> : null
    }
    </>
  )
}

export default ConsumptionInput