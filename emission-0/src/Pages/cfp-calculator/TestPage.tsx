import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import CalcNavButtons from "../../components/CalcNavButtons";
import Diet from "./Diet";
import Electricity from "./Electricity";
import Travels from "./Travels";

// const pages = [
//   <Diet setCurrent={setCurret}/>,
//   <Travels/>,
//   <Electricity/>,
// ]


export function TestPage() {

  const [current, setCurrent] = useState<number>(0);


  return (
    <div className="CalculatorApp">
      {current === 0 ? 
      <Diet setCurrent={setCurrent}/> : null  
      }
      {current === 1 ?
      <Travels setCurrent={setCurrent}/> : null  
      }
      {current === 2 ? 
      <Electricity setCurrent={setCurrent}/> : null
      }
    </div>
    )
}

