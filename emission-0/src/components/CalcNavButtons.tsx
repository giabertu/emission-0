import React from 'react'
import { useNavigate } from 'react-router-dom';



//Make sure to pass down strings without appending '/'. 
function CalcNavButtons(props: {back?: string, next: string, exit?: string}) {
  const {back, next, exit} = props;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`${back}`);
  }
  const handleNext = () => {
     navigate(`${next}`);
  }
  const handleExit = () => {
    navigate(`${exit}`)
  }



  return (
    <div className='navigation-btns'>
        {exit ? <button onClick={handleExit}>Exit</button> : <button onClick={handleBack}>Back</button>}
        <button onClick={handleNext}>Next</button>
      </div>
  )
}

export default CalcNavButtons