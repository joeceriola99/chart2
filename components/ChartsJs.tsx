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
            const response = await fetch('https://joeceriola99.github.io/chart/data/bandwidth2.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
  
          const name = jsonData.map((row: any) => row.name);
          const data = jsonData.map((row: any) => row.data);
          const time = jsonData.map((row: any) => row.time);
          const labels = Array.from({ length: name.length }, (_, i) => i.toString());
          
            const chartData = {
              labels: labels,
              datasets: [
                {
                  label: 'Data',
                  data: [...data],
                  fill: true,
                  backgroundColor: 'rgb(75, 192, 192)',
                  borderColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                  label: 'Time',
                  data: [...time],
                  fill: true,
                  backgroundColor: 'rgb(53, 35, 192)',
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
          setLoadTimeChartsJs(average);
          setFastestLoadTimeChartsJs(fastest);
          setSlowestLoadTimeChartsJs(slowest);
  
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
            const response = await fetch('https://joeceriola99.github.io/chart/data/bandwidth.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
  
          const name = jsonData.map((row: any) => row.name);
          const data = jsonData.map((row: any) => row.data);
          const time = jsonData.map((row: any) => row.time);
  
            const chartData = {
              labels: [...data],
              datasets: [
                {
                  label: 'Data',
                  data: [...data],
                  fill: true,
                  backgroundColor: 'rgb(75, 192, 192)',
                  borderColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                  label: 'Time',
                  data: [...time],
                  fill: true,
                  backgroundColor: 'rgb(53, 35, 192)',
                  borderColor: 'rgba(75, 192, 192, 0.2)',
                }
                
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
          setLoadTimeChartsJs(average);
          setFastestLoadTimeChartsJs(fastest);
          setSlowestLoadTimeChartsJs(slowest);
  
            }
        };

        const data = {
            labels: chartsJsData.labels || [],
            datasets: chartsJsData.datasets || [],
          };
        
        const options = chartsJsOptions

    return (
        <div className="flex flex-col justify-center">
            <section className="h-full">
                <h2 className='text-3xl font-bold text-center'> CHARTS JS </h2>
                <div className='flex flex-col items-center'>
                    <button onClick={fetchSmallDataChartsJs} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 1,000 DATA POINTS</button>
                    <button onClick={fetchLargeDataChartsJs} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 10,000 DATA POINTS</button>
                    <p className='text-center'>Fastest load time: {fastestLoadTimeChartsJs?.toFixed(3)} ms | Slowest load time: {slowestLoadTimeChartsJs?.toFixed(3)} ms</p>
                    <p className='font-bold text-center'>Average load time: {loadTimeChartsJs?.toFixed(3)} ms</p>
                  <div style={{ backgroundColor: "white", width: "400px", height: "250px" }}>
                    <Line data={data} options={options} style={{ height: 250, width: 400, margin: 'auto' }} />
                  </div>
                </div>
            </section>
        </div>
    )
}