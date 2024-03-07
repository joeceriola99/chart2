'use client'
import React, { PureComponent, useEffect, useState, useRef } from 'react';
import { Chart as GoogleChart } from 'react-google-charts';

export default function GoogleCharts() {
    const [loadTimeGoogleChart, setLoadTimeGoogleChart] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [googleChartOptions, setGoogleChartOptions] = useState<any>({});
    const [googleChartData, setGoogleChartData] = useState<any>([]);
    const [fastestLoadTimeGoogleChart, setFastestLoadTimeGoogleChart] = useState(0);
    const [slowestLoadTimeGoogleChart, setSlowestLoadTimeGoogleChart] = useState(0);

    const fetchSmallDataGoogleChart = async () => {
        setLoading(true);
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        let totalLoadTime = 0;
        const numCalls = 5;
  
        for (let i = 0; i < numCalls; i++) {
          try {
            const startTimeGoogleChart = performance.now();
            const response = await fetch('https://joeceriola99.github.io/chart/data/google_bandwidth2.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
            
            const data = [
              ['Name', 'Data', 'Time'],
              ...jsonData
            ]
            console.log(data)
  
            setGoogleChartData(data);
  
  
            setGoogleChartOptions({
              chart: {
                title: 'Google Line Chart',
                subtitle: 'Chart Comparison',
              },
            });
                
            const endTimeGoogleChart = performance.now();
            const loadTime = endTimeGoogleChart - startTimeGoogleChart;
            totalLoadTime += (endTimeGoogleChart - startTimeGoogleChart);
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
        setLoadTimeGoogleChart(average);
        setFastestLoadTimeGoogleChart(fastest);
        setSlowestLoadTimeGoogleChart(slowest);
  
        }
  
      };
  
      const fetchLargeDataGoogleChart = async () => {
        setLoading(true);
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        let totalLoadTime = 0;
        const numCalls = 5;
  
        for (let i = 0; i < numCalls; i++) {
          try {
          const startTimeGoogleChart = performance.now();
          const response = await fetch('https://joeceriola99.github.io/chart/data/google_bandwidth.json')
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const jsonData = await response.json();
          
          const data = [
            ['Name', 'Data', 'Time'],
            ...jsonData
          ]
          console.log(data)
  
          setGoogleChartData(data);
  
  
          setGoogleChartOptions({
            chart: {
              title: 'Google Line Chart',
              subtitle: 'Chart Comparison',
            },
          });
              
          const endTimeGoogleChart = performance.now();
            const loadTime = endTimeGoogleChart - startTimeGoogleChart;
            totalLoadTime += (endTimeGoogleChart - startTimeGoogleChart);
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
        setLoadTimeGoogleChart(average);
        setFastestLoadTimeGoogleChart(fastest);
        setSlowestLoadTimeGoogleChart(slowest);
  
        }
  
      };

    return (
        <div>
            <section className="h-full">
                <h2 className='text-3xl font-bold text-center'> GOOGLE CHARTS </h2>
                <div className='flex flex-col items-center'>
                    <button onClick={fetchSmallDataGoogleChart} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 1,000 DATA POINTS</button>
                    <button onClick={fetchLargeDataGoogleChart} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 10,000 DATA POINTS</button>
                    <p className='text-center'>Fastest load time: {fastestLoadTimeGoogleChart?.toFixed(3)} ms | Slowest load time: {slowestLoadTimeGoogleChart?.toFixed(3)} ms</p>
                    <p className='font-bold text-center'>Average load time: {loadTimeGoogleChart?.toFixed(3)} ms</p>
                  <div style={{justifyContent: 'center', alignItems: 'center',}}>
                    <div style={{ backgroundColor: "white", width: "400px", height: "250px" }}>
                      <GoogleChart
                      chartType="LineChart"
                      width="400px"
                      height="250px"
                      data={googleChartData}
                      options={googleChartOptions}
                      />
                    </div>
                  </div>
                </div>
            </section>
        </div>
    )
}