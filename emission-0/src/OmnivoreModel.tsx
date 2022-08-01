import React from 'react'
import { CheeseModel } from './CheeseModel';
import { MeatModel } from './MeatModel'
import { MilkModel } from './MilkModel'

export function DietChoiceModel(props: {dietChoice: string, meatPosition?: number[], milkPosition?: number[], cheesePosition?: number[]}) {

  const {dietChoice, meatPosition, milkPosition, cheesePosition} = props;

  return (
    <group position={[-0.5,0,0]}>
      <MeatModel meatPosition={meatPosition} />
      <MilkModel position={milkPosition} />
      <CheeseModel position={cheesePosition} />
    </group>
  )
}

