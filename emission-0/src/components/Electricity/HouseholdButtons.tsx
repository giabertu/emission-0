import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { useState } from 'react';

function HouseholdButtons(props: {handleHouseholdButton : any}) {
  const [size, setSize] = useState<SizeType>('large');
  const { handleHouseholdButton } = props;

  return (
    <div className='el-buttons'>
      <button className='calculator-button' 
      onClick={(e) => handleHouseholdButton(e)}>
        1-2
      </button>
      <button className='calculator-button' 
      onClick={(e) => handleHouseholdButton(e)}>
        3-4
      </button>
      <button className='calculator-button' 
      onClick={(e) => handleHouseholdButton(e)}>
        4+
      </button>
    </div>
  )
}

export default HouseholdButtons