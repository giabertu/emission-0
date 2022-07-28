import React from "react"
import { useNavigate } from "react-router-dom"
import CalcNavButtons from "../../components/CalcNavButtons";


export const Calculator = () => {
  const navigate = useNavigate();


  return (
    <div className="CalculatorApp">
      <h1>Calculator App!</h1>
      <p>We are going to ask you a few questions about your habits<br/>
         So we can better estimate your carbon footprint. </p>
      <CalcNavButtons exit={'/'} next={'/diet'} start={true}/>
    </div>
    )
}

