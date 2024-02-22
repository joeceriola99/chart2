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
            const response = await fetch('https://joeceriola99.github.io/chart/data/data2.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
            setHighChartOptions({
              title: {
                text: 'Line Chart'
              },
              xAxis: {
                categories: jsonData.map((row: any) => row.name),
              },
              series: [
                {
                  name: 'UV',
                  data: jsonData.map((row: any) => row.uv),
                },
                {
                  name: 'PV',
                  data: jsonData.map((row: any) => row.pv),
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
          setLoadTimeHighChart(average/1000);
          setFastestLoadTimeHighChart(fastest/1000);
          setSlowestLoadTimeHighChart(slowest/1000);
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
            const response = await fetch('https://joeceriola99.github.io/chart/data/data.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
            setHighChartOptions({
              title: {
                text: 'Line Chart'
              },
              xAxis: {
                categories: jsonData.map((row: any) => row.name),
              },
              series: [
                {
                  name: 'UV',
                  data: jsonData.map((row: any) => row.uv),
                },
                {
                  name: 'PV',
                  data: jsonData.map((row: any) => row.pv),
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
          setLoadTimeHighChart(average/1000);
          setFastestLoadTimeHighChart(fastest/1000);
          setSlowestLoadTimeHighChart(slowest/1000);
        };
      };

    return (
        <div>
            <section className='bg-gray-100 h-full'>
                <h2 className='text-3xl font-bold text-center'> HIGHCHARTS </h2>
                <div className='flex flex-col items-center'>
                    <button onClick={fetchSmallDataHighChart} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 1,000 DATA POINTS</button>
                    <button onClick={fetchLargeDataHighChart} type="button" className="text-white justify-center bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 10,000 DATA POINTS</button>
                    <p className='text-center'>Fastest load time: {fastestLoadTimeHighChart?.toFixed(2)} s | Slowest load time: {slowestLoadTimeHighChart?.toFixed(2)} s</p>
                    <p className='font-bold text-center'>Average load time: {loadTimeHighChart?.toFixed(2)} s</p>
                </div>

                <div id="highChart" style={{'width':'100%', 'height':'400px'}}>
                    <HighchartsReact
                    highcharts={Highcharts}
                    options={highChartOptions}
                    />
                </div>
            </section>
        </div>
    )
}