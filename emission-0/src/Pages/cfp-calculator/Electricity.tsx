import React, { useState } from 'react'
import HouseholdButtons from '../../components/Electricity/HouseholdButtons'

function Electricity(props: {handleHouseholdButton: any}) {

  const {handleHouseholdButton} = props;

  return (
    <div>
      <h1>Electricity</h1>
      <h2>How many bedrooms does the house you live in have?</h2>
      <HouseholdButtons handleHouseholdButton={handleHouseholdButton}/>
    </div>
  )
}

export default Electricity


// Small house/flat – 1 -2 bedrooms
// A small to medium sized house or flat, with 1 or 2 bedrooms and 3 to 4 people, would use around 8000kWh of gas per year, and 2000kWh of electricity.

// This would mean an average monthly energy bill of £66, or £795 a year.

 

// Medium house - 3-bedroom house
// If your house is a little bigger, say 3 bedrooms and 3 – 4 people, your usage might be more like 12,500kWh of gas per year, and 3100kWh of electricity.

// This would mean an average monthly energy bill of £97 per month, or £1,163 a year.

 

// Large house – 4 or more bedrooms
// For a bigger house with 4 or more bedrooms and 5 people, the average would be around 18,000kWh of gas per year, and 4,600kWh of electricity

// This would mean an average monthly energy bill of £137 per month, or £1,639 a year.