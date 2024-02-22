'use client'
import React, { PureComponent, useEffect, useState, useRef } from 'react';
import {Chart as ChartLine} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ChartsJs() {
    const [loadTimeChartsJs, setLoadTimeChartsJs] = useState<number | null>(null);
    const [fastestLoadTimeChartsJs, setFastestLoadTimeChartsJs] = useState(0);
    const [slowestLoadTimeChartsJs, setSlowestLoadTimeChartsJs] = useState(0);
    const [chartsJsData, setChartsJsData] = useState<any>([]);
    const [chartsJsOptions, setChartsJsOptions] = useState<any>({});
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef2 = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<ChartLine<"line", number[], string> | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchSmallDataChartsJs = async () => {
        setLoading(true);
        
        let totalLoadTime = 0;
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        const numCalls = 5;
  
        for (let i = 0; i < numCalls; i++) {
          try {
            const startTimeChartsJs = performance.now();
            const response = await fetch('https://joeceriola99.github.io/chart/data/data2.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
  
          const name = jsonData.map((row: any) => row.name);
          const uv = jsonData.map((row: any) => row.uv);
          const pv = jsonData.map((row: any) => row.pv);
          const amt = jsonData.map((row: any) => row.amt); 
  
            const chartData = {
              labels: [...name],
              datasets: [
                {
                  label: 'UV',
                  data: [...uv],
                  fill: true,
                  backgroundColor: 'rgb(75, 192, 192)',
                  borderColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                  label: 'PV',
                  data: [...pv],
                  fill: true,
                  backgroundColor: 'rgb(53, 35, 192)',
                  borderColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                  label: 'AMT',
                  data: [...amt],
                  fill: true,
                  backgroundColor: 'rgb(78, 120, 192)',
                  borderColor: 'rgba(75, 192, 192, 0.2)',
                },
                
              ],
            };
  
            setChartsJsData(chartData);
  
            const chartOptions = {
              responsive: true,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            };
            setChartsJsOptions(chartOptions);
            
            const endTimeChartsJs = performance.now();
            const loadTime = endTimeChartsJs - startTimeChartsJs;
            totalLoadTime += (endTimeChartsJs - startTimeChartsJs);
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
          setLoadTimeChartsJs(average/1000);
          setFastestLoadTimeChartsJs(fastest/1000);
          setSlowestLoadTimeChartsJs(slowest/1000);
  
        }
      };
  
  
      const fetchLargeDataChartsJs = async () => {
        setLoading(true);
        
        let totalLoadTime = 0;
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        const numCalls = 5;
  
        for (let i = 0; i < numCalls; i++) {
          try {
            const startTimeChartsJs = performance.now();
            const response = await fetch('https://joeceriola99.github.io/chart/data/data.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
  
          const name = jsonData.map((row: any) => row.name);
          const uv = jsonData.map((row: any) => row.uv);
          const pv = jsonData.map((row: any) => row.pv);
          const amt = jsonData.map((row: any) => row.amt); 
  
            const chartData = {
              labels: [...name],
              datasets: [
                {
                  label: 'UV',
                  data: [...uv],
                  fill: true,
                  backgroundColor: 'rgb(75, 192, 192)',
                  borderColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                  label: 'PV',
                  data: [...pv],
                  fill: true,
                  backgroundColor: 'rgb(53, 35, 192)',
                  borderColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                  label: 'AMT',
                  data: [...amt],
                  fill: true,
                  backgroundColor: 'rgb(78, 120, 192)',
                  borderColor: 'rgba(75, 192, 192, 0.2)',
                },
                
              ],
            };
  
            setChartsJsData(chartData);
  
            const chartOptions = {
              responsive: true,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            };
            setChartsJsOptions(chartOptions);
  
            const endTimeChartsJs = performance.now();
            const loadTime = endTimeChartsJs - startTimeChartsJs;
            totalLoadTime += (endTimeChartsJs - startTimeChartsJs);
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
          setLoadTimeChartsJs(average/1000);
          setFastestLoadTimeChartsJs(fastest/1000);
          setSlowestLoadTimeChartsJs(slowest/1000);
  
            }
        };

        const data = {
            labels: chartsJsData.labels || [],
            datasets: chartsJsData.datasets || [],
          };
        
        const options = chartsJsOptions

    return (
        <div className="flex flex-col h-screen">
            <section className="bg-gray-100 h-full">
                <h2 className='text-3xl font-bold text-center'> CHARTS JS </h2>
                <div className='flex flex-col items-center'>
                    <button onClick={fetchSmallDataChartsJs} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 1,000 DATA POINTS</button>
                    <button onClick={fetchLargeDataChartsJs} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 10,000 DATA POINTS</button>
                    <p className='text-center'>Fastest load time: {fastestLoadTimeChartsJs?.toFixed(2)} s | Slowest load time: {slowestLoadTimeChartsJs?.toFixed(2)} s</p>
                    <p className='font-bold text-center'>Average load time: {loadTimeChartsJs?.toFixed(2)} s</p>
                </div>
                
                <Line data={data} options={options} />
                    

            </section>
        </div>
    )
}