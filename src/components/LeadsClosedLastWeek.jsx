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

function LeadsClosedLastWeek() {
  const { leadsClosed, getLeadsClosed } = useLead();
  console.log(leadsClosed);

  useEffect(() => {
    getLeadsClosed();
  }, []);

  const data = {
    labels: leadsClosed.map((lead) => lead.name),
    datasets: [
      {
        label: 'Leads Closed Last Week',
        data: leadsClosed.map((lead) => lead.timeToClose),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
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

export default LeadsClosedLastWeek;
