'use client'
import React, { PureComponent, useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function HighCharts() {
    const [loadTimeHighChart, setLoadTimeHighChart] = useState<number | null>(null);
    const [fastestLoadTimeHighChart, setFastestLoadTimeHighChart] = useState(0);
    const [slowestLoadTimeHighChart, setSlowestLoadTimeHighChart] = useState(0);
    const [highChartOptions, setHighChartOptions] = useState<any>({});
    const [loading, setLoading] = useState(false);

    
    const fetchSmallDataHighChart = async () => {
        setLoading(true);
        let totalLoadTime = 0;
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        const numCalls = 5;
  
        for (let i = 0; i < numCalls; i++) {
          try {
            const startTimeHighChart = performance.now();
            const response = await fetch('https://joeceriola99.github.io/chart/data/bandwidth2.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
            setHighChartOptions({
              title: {
                text: 'Line Chart'
              },
              xAxis: {
                categories: jsonData.map((row: any) => row.data),
              },
              series: [
                {
                  name: 'Data',
                  data: jsonData.map((row: any) => row.data),
                },
                {
                  name: 'Time',
                  data: jsonData.map((row: any) => row.time),
                },
              ]
            });
                
            const endTimeHighChart = performance.now();
            const loadTime = endTimeHighChart - startTimeHighChart;
            totalLoadTime += (endTimeHighChart - startTimeHighChart);
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
          setLoadTimeHighChart(average);
          setFastestLoadTimeHighChart(fastest);
          setSlowestLoadTimeHighChart(slowest);
        };
      };
  
      const fetchLargeDataHighChart = async () => {
        setLoading(true);
        let totalLoadTime = 0;
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        const numCalls = 5;
  
        for (let i = 0; i < numCalls; i++) {
          try {
            const startTimeHighChart = performance.now();
            const response = await fetch('https://joeceriola99.github.io/chart/data/bandwidth.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
            setHighChartOptions({
              title: {
                text: 'Line Chart'
              },
              xAxis: {
                categories: jsonData.map((row: any) => row.data),
              },
              series: [
                {
                  name: 'Data',
                  data: jsonData.map((row: any) => row.data),
                },
                {
                  name: 'Time',
                  data: jsonData.map((row: any) => row.time),
                },
              ]
            });
                
            const endTimeHighChart = performance.now();
            const loadTime = endTimeHighChart - startTimeHighChart;
            totalLoadTime += (endTimeHighChart - startTimeHighChart);
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
          setLoadTimeHighChart(average);
          setFastestLoadTimeHighChart(fastest);
          setSlowestLoadTimeHighChart(slowest);
        };
      };

    return (
        <div>
            <section className=' h-full'>
                <h2 className='text-3xl font-bold text-center'> HIGHCHARTS </h2>
                <div className='flex flex-col items-center'>
                    <button onClick={fetchSmallDataHighChart} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 1,000 DATA POINTS</button>
                    <button onClick={fetchLargeDataHighChart} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 10,000 DATA POINTS</button>
                    <p className='text-center'>Fastest load time: {fastestLoadTimeHighChart?.toFixed(3)} ms | Slowest load time: {slowestLoadTimeHighChart?.toFixed(3)} ms</p>
                    <p className='font-bold text-center'>Average load time: {loadTimeHighChart?.toFixed(3)} ms</p>
                  {/* <div id="highChart" style={{'width':'400px', 'height':'150px'}}> */}
                      <HighchartsReact
                      containerProps={{ style: { height: "250px", width: "400px" } }}
                      highcharts={Highcharts}
                      options={highChartOptions}
                      />
                  {/* </div> */}
                </div>
            </section>
        </div>
    )
}