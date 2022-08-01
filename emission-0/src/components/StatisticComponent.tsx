import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import CountUp from 'react-countup';

function StatisticComponent(props: {title: string, value: number, prefix?: string, suffix?: string}) {

  const {title, value, prefix, suffix} = props;

  return (
      <div className='statistic-card'>
        <p>{title}</p>
        <h2>{prefix ? prefix: '' } <CountUp end={value} separator={','} start={0} duration={1} delay={0}/> {suffix ? suffix : '' }</h2>
      </div>
  );

} 

export default StatisticComponent;