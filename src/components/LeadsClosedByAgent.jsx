import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import useLead from '../contexts/LeadContext';
import { useEffect } from 'react';

function LeadsClosedByAgent() {
  const { leadsByAgent, getLeadsByAgent } = useLead();
  console.log(leadsByAgent);

  useEffect(() => {
    getLeadsByAgent();
  }, []);

  const data = {
    labels: Object.keys(leadsByAgent).map((lead) => lead),
    datasets: [
      {
        label: 'Leads Closed',
        data: Object.values(leadsByAgent).map((lead) => lead),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: ' rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{ width: '500px', margin: 'auto' }}>
      <Bar data={data} />
    </div>
  );
}

export default LeadsClosedByAgent;
