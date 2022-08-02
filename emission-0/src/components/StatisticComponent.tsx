import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import { PieChart } from 'react-minimal-pie-chart';

function StatisticComponent(props: {title: string, value: number | string, prefix?: string, suffix?: string, className?: string,  pieChart?: boolean, data?: {title: string, value: number, color: string}[]}) {

  const {title, value, prefix, suffix, className, pieChart, data} = props;
  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };

  return (
      <div className={className ? 'statistic-card' + className : 'statistic-card'}>
        <p>{title}</p>
        { !pieChart ? 
          <h2>{prefix ? prefix: '' } <CountUp end={+value} separator={','} start={0} duration={1} delay={0}/> {suffix ? suffix : '' }</h2> 
          :
          <PieChart className='pie-chart'
          data={data}
          labelPosition={70}
          label={({ x, y, dx, dy, dataEntry }) => (
            <text
            x={x}
            y={y}
            dx={dx}
            dy={dy}
            dominant-baseline="central"
            text-anchor="middle"
            style={{
              fontSize: '1rem',
              fill: 'rgb(7, 137, 7)', 
             backgroundColor: '#ffffff',
              fontWeight: 700
            }}>
            {dataEntry.title}
          </text>
        )}
        labelStyle={defaultLabelStyle} animate />
        }
      </div>
  );

} 

export default StatisticComponent;