import React, { useEffect } from 'react'
import { CheeseModel } from './CheeseModel';
import { FruitBowlModel } from './FruitBowlModel';
import { MeatModel } from './MeatModel';
import { MilkModel } from './MilkModel';

export function DietChoiceModel(props: {dietChoice: string, fruitPosition?: number[], meatPosition?: number[], milkPosition?: number[], cheesePosition?: number[]}) {

  const {dietChoice, fruitPosition, meatPosition, milkPosition, cheesePosition} = props;
  useEffect(() => {
  }, [])

  return (
      <>
      {dietChoice == 'Omnivore' || dietChoice == 'Vegetarian' ?
        <group position={[-0.5,0,0]} scale={[1.2,1.2,1.2]}>
          { dietChoice == 'Omnivore' ?
            <MeatModel meatPosition={meatPosition} /> : <FruitBowlModel position={fruitPosition}/>
          }
          <MilkModel position={milkPosition} />
          <CheeseModel position={cheesePosition} /> 
        </group>  : null  
      }
      {dietChoice == 'Vegan' ?
        <group position={[-0.5,0,0]} scale={[1.2,1.2,1.2]}>
          <FruitBowlModel position={fruitPosition}  /> 
        </group> : null
      }
      </>
  )
}

