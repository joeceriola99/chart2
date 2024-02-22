'use client'
import React, { PureComponent, useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Recharts() {

    const [loadTimeRecharts, setLoadTimeRecharts] = useState(0);
    const [fastestLoadTimeRecharts, setFastestLoadTimeRecharts] = useState(0);
    const [slowestLoadTimeRecharts, setSlowestLoadTimeRecharts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [jsonDataState, setJsonDataState] = useState<any>([]);

    const fetchLargeDataRecharts = async () => {
        setLoading(true);
        let totalLoadTime = 0;
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        const numCalls = 5;
  
        for (let i = 0; i < numCalls; i++) {
          try {
            const startTimeRecharts = performance.now();
            const response = await fetch('https://joeceriola99.github.io/chart/data/data.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
            setJsonDataState(jsonData);
              
            const endTimeRecharts = performance.now();
            const loadTime = endTimeRecharts - startTimeRecharts;
            totalLoadTime += (endTimeRecharts - startTimeRecharts);
            if (loadTime < fastest) {
              fastest = loadTime;
            }
            if (loadTime > slowest) {
              slowest = loadTime;
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        const average = totalLoadTime / numCalls;
        setLoadTimeRecharts(average/1000);
        setFastestLoadTimeRecharts(fastest/1000);
        setSlowestLoadTimeRecharts(slowest/1000);
          
        }
      };
  
      const fetchSmallDataRecharts = async () => {
        setLoading(true);
        let totalLoadTime = 0;
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        const numCalls = 5;
  
        for (let i = 0; i < numCalls; i++) {
          try {
            const startTimeRecharts = performance.now();
            const response = await fetch('https://joeceriola99.github.io/chart/data/data2.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
            setJsonDataState(jsonData);
              
            const endTimeRecharts = performance.now();
            const loadTime = endTimeRecharts - startTimeRecharts;
            totalLoadTime += (endTimeRecharts - startTimeRecharts);
            if (loadTime < fastest) {
              fastest = loadTime;
            }
            if (loadTime > slowest) {
              slowest = loadTime;
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        const average = totalLoadTime / numCalls;
        setLoadTimeRecharts(average/1000);
        setFastestLoadTimeRecharts(fastest/1000);
        setSlowestLoadTimeRecharts(slowest/1000);
          
        }
      };

    return (
        <div className="flex flex-col h-screen">
            <section className="bg-gray-100 h-full">
                <h2 className='text-3xl font-bold text-center'> RECHARTS </h2>
                <div className='flex flex-col items-center'>
                    <button onClick={fetchSmallDataRecharts} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 1,000 DATA POINTS</button>
                    <button onClick={fetchLargeDataRecharts} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 10,000 DATA POINTS</button>
                    <p className='text-center'>Fastest load time: {fastestLoadTimeRecharts?.toFixed(2)} s | Slowest load time: {slowestLoadTimeRecharts?.toFixed(2)} s</p>
                    <p className='font-bold text-center'>Average load time: {loadTimeRecharts?.toFixed(2)} s</p>
                </div>
                <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center',}}>
                    <LineChart
                        width={1500}
                        height={700}
                        data={jsonDataState}
                        margin={{
                        top: 50,
                        right: 5,
                        left: 10,
                        bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                        type="monotone"
                        dataKey="pv"
                        stroke="#8884d8"
                        />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="Index" stroke="#82ca9d" />
                    </LineChart>
                </div>
            </section> 
        </div>
    )
}
