import React, { useState } from 'react';
import './Diet.css'
import { useNavigate } from 'react-router-dom';
import DietButtons from '../../components/DietButtons';

function Diet() {
  const navigate = useNavigate()
  const [dietChoice, setDietChoice] = useState('')

  const handleBack = () => {
    navigate('/cfp-calculator')
  }
  const handleNext = () => {
    navigate('/flight')
  }
  const handleDietChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    //set diet choice to either 'Omnivore, Vegetarian or Vegan'
    setDietChoice(e.target.value)
  }

  return (
    <div className='Diet'>
      <h1>Diet</h1>
      <h2>What kind of diet do you follow?</h2>
      <DietButtons handleDietChoice={handleDietChoice} /> 
      <button onClick={handleBack}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default Diet