'use client'
import React, { PureComponent, useEffect, useState, useRef } from 'react';
import { ResponsiveLine } from '@nivo/line'

export default function Nivo() {
    const [jsonDataStateNivo, setJsonDataStateNivo] = useState<any>([]);    
    
    const [loadTimeNivo, setLoadTimeNivo] = useState<number | null>(null);
    const [fastestLoadTimeNivo, setFastestLoadTimeNivo] = useState(0);
    const [slowestLoadTimeNivo, setSlowestLoadTimeNivo] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchLargeDataNivo = async () => {
        setLoading(true);
  
        let totalLoadTime = 0;
        const numCalls = 5;
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        for (let i = 0; i < numCalls; i++) {
          try {
            const startTimeNivo = performance.now();
            const response = await fetch('https://joeceriola99.github.io/chart/data/data3.json')
            if (!response.ok) {
              throw new Error(`Error fetching data: ${response.statusText}`);
            }
            const jsonData = await response.json();
            setJsonDataStateNivo(jsonData);
              
            const endTimeNivo = performance.now();
            const loadTime = endTimeNivo - startTimeNivo;
            totalLoadTime += (endTimeNivo - startTimeNivo);
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
          setLoadTimeNivo(average/1000);
          setFastestLoadTimeNivo(fastest/1000);
          setSlowestLoadTimeNivo(slowest/1000);
        }
      };
  
      const fetchSmallDataNivo = async () => {
        setLoading(true);
  
        let totalLoadTime = 0;
        const numCalls = 5;
        let fastest = Number.MAX_VALUE;
        let slowest = 0;
        for (let i = 0; i < numCalls; i++) {
          try {
          const startTimeNivo = performance.now();
          const response = await fetch('https://joeceriola99.github.io/chart/data/data4.json')
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const jsonData = await response.json();
          setJsonDataStateNivo(jsonData);
            
          const endTimeNivo = performance.now();
          const loadTime = endTimeNivo - startTimeNivo;
            totalLoadTime += (endTimeNivo - startTimeNivo);
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
          setLoadTimeNivo(average/1000);
          setFastestLoadTimeNivo(fastest/1000);
          setSlowestLoadTimeNivo(slowest/1000);
        }
      };
  
    return (
        <div className="flex flex-col h-screen">
            <section className="bg-gray-300 h-full">
            <h2 className='text-3xl font-bold text-center'>NIVO </h2>
                <div className='flex flex-col items-center'>
                <button onClick={fetchSmallDataNivo} type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 1,000 DATA POINTS</button>
                <button onClick={fetchLargeDataNivo} type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">LOAD 10,000 DATA POINTS</button>
                <p className='text-center'>Fastest load time: {fastestLoadTimeNivo?.toFixed(2)} s | Slowest load time: {slowestLoadTimeNivo?.toFixed(2)} s</p>
                <p className='font-bold text-center'>Average load time: {loadTimeNivo?.toFixed(2)} s</p>
                </div>                
                    <ResponsiveLine
                        data={jsonDataStateNivo}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 'auto',
                            max: 'auto',
                            stacked: true,
                            reverse: false
                        }}
                        yFormat=" >-.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'transportation',
                            legendOffset: 36,
                            legendPosition: 'middle'
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'count',
                            legendOffset: -40,
                            legendPosition: 'middle'
                        }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
            </section>
        </div>
    )
}