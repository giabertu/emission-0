import React from 'react'
import { Link, useNavigate } from 'react-router-dom';



//Make sure to pass down strings without appending '/'. 
function CalcNavButtons(props: {start?: boolean, back?: string, next?: string, exit?: string, setCurrent?: any}) {
  const {back, next, exit, setCurrent, start} = props;

  const navigate = useNavigate();

  // const handleBack = () => {
  //   navigate(`${back}`);
  // }
  const handleNext = () => {
     navigate(`${next}`);
  }
  const handleExit = () => {
    navigate(`${exit}`)
  }



  return (
    <div className='navigation-btns'>
        {exit ? 
        <Link to={exit}>
          <button onClick={handleExit}>Exit</button>
        </Link> : 
          <button onClick={() => setCurrent((prev: number) => {
            return prev-1;
          })}>Back</button>}
          {start ? 
            <button onClick={handleNext}>Begin</button> :
            <button onClick={() => setCurrent((prev: number) => {
              return prev+1;
            })}>Next</button>
          }
      </div>
  )
}

export default CalcNavButtons