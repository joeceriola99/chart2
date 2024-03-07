'use client'
import React, { PureComponent, useEffect, useState, useRef } from 'react';
import Chart from "react-apexcharts";

export default function Apex() {
    const [loadTimeApex, setLoadTimeApex] = useState<number | null>(null);
    const [fastestLoadTimeApex, setFastestLoadTimeApex] = useState(0);
    const [slowestLoadTimeApex, setSlowestLoadTimeApex] = useState(0);
    const [jsonDataStateApex, setJsonDataStateApex] = useState<any>([]);    
    const [loading, setLoading] = useState(false);

    const fetchLargeDataApex = async () => {
        setLoading(true);
        let totalLoadTime = 0;
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        const numCalls = 5;
  
        for (let i = 0; i < numCalls; i++) {
          try {
            const startTimeApex = performance.now();
            const response = await fetch('https://joeceriola99.github.io/chart/data/data.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
            setJsonDataStateApex(jsonData);
              
            const endTimeApex = performance.now();
            const loadTime = endTimeApex - startTimeApex;
            totalLoadTime += (endTimeApex - startTimeApex);
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
          setLoadTimeApex(average/1000);
          setFastestLoadTimeApex(fastest/1000);
          setSlowestLoadTimeApex(slowest/1000);
        }
      };
  
      const fetchSmallDataApex = async () => {
        setLoading(true);
        let totalLoadTime = 0;
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        const numCalls = 5;
  
        for (let i = 0; i < numCalls; i++) {
          try {
            const startTimeApex = performance.now();
            const response = await fetch('https://joeceriola99.github.io/chart/data/data.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
            setJsonDataStateApex(jsonData);
              
            const endTimeApex = performance.now();
            const loadTime = endTimeApex - startTimeApex;
            totalLoadTime += (endTimeApex - startTimeApex);
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
          setLoadTimeApex(average/1000);
          setFastestLoadTimeApex(fastest/1000);
          setSlowestLoadTimeApex(slowest/1000);
        }
      };
  
  
      const processedData = jsonDataStateApex.map((row: any) => ({
        x: row.name, 
        y: {
          uv: row.uv,
          pv: row.pv,
        }
      }));
  
      const options = {
        chart: {
          id: "class-data",
        },
        xaxis: {
          categories: processedData.map((row: any) => row.x),
        },
      };
      
      const series = [
        {
          name: "uv",
          data: processedData.map((row: any) => row.y.uv),
        },
        {
          name: "pv",
          data: processedData.map((row: any) => row.y.pv),
        },
      ];

    return (
        <div className="flex flex-col h-screen">
            <section className="bg-gray-100 h-full justify-center">

            <h2 className='text-3xl font-bold text-center'>APEXCHARTS</h2>
            <div className='flex flex-col items-center'>
            <button onClick={fetchSmallDataApex} type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 1,000 DATA POINTS</button>
            <button onClick={fetchLargeDataApex} type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 10,000 DATA POINTS</button>
            <p className='text-center'>Fastest load time: {fastestLoadTimeApex?.toFixed(2)} s | Slowest load time: {slowestLoadTimeApex?.toFixed(2)} s</p>
            <p className='font-bold text-center'>Average load time: {loadTimeApex?.toFixed(2)} s</p>
            </div>
            <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center',}}>
                <Chart options={options} series={series} type="line" width={1000} />
            </div>

            </section>
        </div>
    )
}