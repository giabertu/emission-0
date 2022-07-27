import React from 'react'
import { Radio } from 'antd';

function DietButtons(props: { handleDietChoice: any}) {

  

  return (
    <Radio.Group defaultValue="a" buttonStyle="solid" id='diet-choices'
    onChange={(e) => {
      console.log(e);
      props.handleDietChoice(e)
    }}>
        <Radio.Button value="Omnivore">Omnivore</Radio.Button>
        <Radio.Button value="Vegetarian">Vegetarian</Radio.Button>
        <Radio.Button value="Vegan">Vegan</Radio.Button>
      </Radio.Group>
  )
}

export default DietButtons