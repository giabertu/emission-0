import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import React, { useState } from 'react';

function HouseholdButtons(props: {handleHouseholdButton : any}) {
  const [size, setSize] = useState<SizeType>('large');
  const { handleHouseholdButton } = props;

  return (
    <div>
      <Button type="primary" shape="round" size={size} 
      onClick={(e) => handleHouseholdButton(e)}>
        1-2
      </Button>
      <Button type="primary" shape="round" size={size} 
      onClick={(e) => handleHouseholdButton(e)}>
        3-4
      </Button>
      <Button type="primary" shape="round" size={size} 
      onClick={(e) => handleHouseholdButton(e)}>
        4+
      </Button> 
    </div>
  )
}

export default HouseholdButtons