import React from 'react'
import { Link, useNavigate } from 'react-router-dom';



//Make sure to pass down strings without appending '/'. 
function CalcNavButtons(props: {back?: string, next: string, exit?: string, data?: any}) {
  const {back, next, exit, data} = props;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`${back}`);
  }
  // const handleNext = () => {
  //    navigate(`${next}`);
  // }
  const handleExit = () => {
    navigate(`${exit}`)
  }



  return (
    <div className='navigation-btns'>
        {exit ? 
        <Link to={exit}>
          <button onClick={handleExit}>Exit</button>
        </Link> : 
        <Link to={back!} state={{data}}>
          <button onClick={handleBack}>Back</button>
        </Link>}
        <Link to={next} state={{data}}>
          <button /* onClick={handleNext} */>Next</button>
        </Link>
      </div>
  )
}

export default CalcNavButtons