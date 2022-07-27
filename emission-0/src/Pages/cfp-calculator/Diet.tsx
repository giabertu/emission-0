import React from 'react';
import { Radio } from 'antd';
import './Diet.css'
import { useNavigate } from 'react-router-dom';

function Diet() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/cfp-calculator')
  }
  const handleNext = () => {
    navigate('/flight')
  }


  return (
    <div className='Diet'>
      <h1>Diet</h1>
      <h2>What kind of diet do you follow?</h2>
      <Radio.Group defaultValue="a" buttonStyle="solid" id='diet-choices'>
        <Radio.Button value="a">Omnivore</Radio.Button>
        <Radio.Button value="b">Vegetarian</Radio.Button>
        <Radio.Button value="c">Vegan</Radio.Button>
      </Radio.Group>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default Diet