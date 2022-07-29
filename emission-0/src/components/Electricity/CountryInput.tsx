import AutoComplete from 'antd/lib/auto-complete'
import React from 'react'
import {DataUtil} from '../../utils/DataUtil'

const data = DataUtil.getCountries()

const options = [
  ...data
]


function CountryInput(props: {handleCountryInput: any}) {

  const {handleCountryInput} = props;

  return (
    <div className='CountryInput'>
    <AutoComplete 
      allowClear={true}
      style={{ width: 200 }}
      options={options}
      onSelect={(value: string, option: {value: string, code: string}) => {handleCountryInput(value, option)}}
      placeholder="Country"
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
    </div>
  )
}

export default CountryInput 