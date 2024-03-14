import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const DomainChart = ({ data }) => {
  // State to hold chart data
  const [chartData, setChartData] = useState({});

  // Format data for chart
 // Format data for chart
 useEffect(() => {
    if (data && Array.isArray(data.dnsRecords)) { // Check if data exists and dnsRecords is an array
      const dnsRecordsDataArray = data.dnsRecords.map(record => ({
        label: record.name,
        value: 1, // Assuming each record contributes a count of 1
      }));
  
      setChartData({
        labels: dnsRecordsDataArray.map(entry => entry.label),
        datasets: [
          {
            label: 'DNS Record Distribution',
            data: dnsRecordsDataArray.map(entry => entry.value),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
          },
        ],
      });
    }
  }, [data]);
  
  
  

  return (
    <div className='table-container' style={{paddingTop:"20px"}}>
      <h2>Domain and Record Type Distribution</h2>
      {data ? <Doughnut data={chartData} /> : <p>No data available</p>}
      <p style={{color:"red"}}>This Feature is yet to Developed!!</p>
    </div>
  );
};

export default DomainChart;
