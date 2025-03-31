import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useLead from '../contexts/LeadContext';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

function TotalLeadsReport() {
  const { totalLeads, getTotalLeads } = useLead();
  console.log(totalLeads);

  useEffect(() => {
    getTotalLeads();
  }, []);

  const data = {
    labels: Object.keys(totalLeads).map((lead) => lead),
    datasets: [
      {
        data: Object.values(totalLeads).map((lead) => lead),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <Pie data={data} />
    </div>
  );
}

export default TotalLeadsReport;
