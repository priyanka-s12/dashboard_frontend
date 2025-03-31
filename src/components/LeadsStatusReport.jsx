import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useLead from '../contexts/LeadContext';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

function LeadsStatusReport() {
  const { leadsStatus, getLeadsStatus } = useLead();
  console.log(leadsStatus);

  useEffect(() => {
    getLeadsStatus();
  }, []);

  const data = {
    labels: Object.keys(leadsStatus).map((lead) => lead),
    datasets: [
      {
        data: Object.values(leadsStatus).map((lead) => lead),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(90, 235, 54)',
          'rgb(26, 81, 152)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div style={{ width: '60%', margin: 'auto' }}>
      <Pie data={data} />
    </div>
  );
}

export default LeadsStatusReport;
