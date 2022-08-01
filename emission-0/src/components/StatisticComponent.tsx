import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import CountUp from 'react-countup';

function StatisticComponent(props: {title: string, value: number}) {

  const {title, value} = props;

/*   function getNumbers(value) {
    const arr = value.toLocaleString("en-GB").split(',')
  } */

  return (
      <div className='statistic-card'>
        <p>{title}</p>
        <h2>{/* <ArrowUpOutlined /> */} <CountUp end={value} separator={','} start={0} duration={1} delay={0}/>  kg</h2>
      </div>
  );

} 

export default StatisticComponent;