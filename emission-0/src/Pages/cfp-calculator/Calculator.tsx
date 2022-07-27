import React from "react"
import { useNavigate } from "react-router-dom"


export const Calculator = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  }
  const handleNext = () => {
    navigate('/diet')
  }


  return (
    <div className="CalculatorApp">
      <h1>Calculator App!</h1>
      <p>We are going to ask you a few questions about your habits<br/>
         So we can better estimate your carbon footprint. </p>
      <button onClick={handleExit}>Exit</button>
      <button onClick={handleNext}>Next</button>
    </div>
    )
}

