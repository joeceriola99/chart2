'use client'
import React, { PureComponent, useEffect, useState, useRef } from 'react';
import "./styles.css";
import ReactDOM from 'react-dom';
import Nivo from './components/Nivo';
import Recharts from './components/Recharts';
import HighCharts from './components/HighChart';
import Apex from './components/Apex';
import GoogleCharts from './components/GoogleCharts';
import ChartsJs from './components/ChartsJs';

  export default function Home() {
    

  return (
    <div className="flex flex-col h-screen">
      <Recharts />
      <HighCharts />
      <ChartsJs />
      <GoogleCharts />
      <Apex />
      <Nivo />
    </div>
  );
}
