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
      <>
        <h3>How much <span className='cheese-and-meat'>cheese {dietChoice == 'Omnivore' ? <>and meat</> : null}</span> do you consume weekly?</h3>
        <InputNumber onChange={handleConsumption} min={0} max={150000} onStep={() => {}} step={50} addonAfter={'g'} defaultValue={100} />
      </> : null
    }
    </>
  )
}

export default ConsumptionInput