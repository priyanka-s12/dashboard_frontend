import Sidebar from '../components/Sidebar';
import useLead from '../contexts/LeadContext';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function SalesAgentView() {
  const { name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(name);

  const { leads, loading, error, agents, getLeads, getAgents } = useLead();
  console.log(leads);

  const filteredLeads = leads.filter((lead) => lead.salesAgent.name === name);
  console.log(filteredLeads);

  const leadStatuses = [
    'New',
    'Contacted',
    'Qualified',
    'Proposal Sent',
    'Closed',
  ];

  const selectedStatus = searchParams.get('status') || '';
  const selectedTimeToClose = searchParams.get('timeToClose') || '';
  const selectedPriority = searchParams.get('priority') || '';

  const updateFilter = (key, value) => {
    console.log(key, value);
    setSearchParams((prevParams) => {
      if (value === '') {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  const filterByStatus =
    selectedStatus === ''
      ? filteredLeads
      : filteredLeads.filter((lead) => lead.status === selectedStatus);

  const filterByPriority =
    selectedPriority === ''
      ? filterByStatus
      : filterByStatus.filter((lead) => lead.priority === selectedPriority);

  const sortByTime =
    selectedTimeToClose === ''
      ? filterByPriority
      : filterByPriority.sort((a, b) =>
          selectedTimeToClose === 'minToMax'
            ? a.timeToClose - b.timeToClose
            : b.timeToClose - a.timeToClose
        );

  return (
    <div className="row">
      <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
        <Sidebar />
      </div>
      <div className="col-md-10 p-3">
        <main className="container-fluid">
          <h3 className="mb-3">Lead List by Sales Agent - {name}</h3>
          <hr />

          <section>
            <section className="d-flex justify-content-between mb-4">
              <div>
                <h5 className="mb-3">Filter by: </h5>
                <div className="d-flex">
                  <select
                    className="form-select me-3"
                    onChange={(e) => updateFilter('status', e.target.value)}
                  >
                    <option value="">Select Status</option>
                    {leadStatuses.map((status, index) => (
                      <option value={status} key={index}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <select
                    className="form-select"
                    onClick={(e) => updateFilter('priority', e.target.value)}
                  >
                    <option value="">Select Priority</option>
                    {['High', 'Medium', 'Low'].map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <h5 className="mb-3">Sort by: </h5>
                <select
                  className="form-select"
                  onChange={(e) => updateFilter('timeToClose', e.target.value)}
                >
                  <option value="">Select Option</option>
                  <option value="minToMax">
                    Time to close - Minimun to Maximum
                  </option>
                  <option value="maxToMin">
                    Time to close - Maximum to Minimum
                  </option>
                </select>
              </div>
            </section>
          </section>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <section>
            <table className="table table-bordered w-75 mt-3">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Lead Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Time to Close</th>
                  <th scope="col">Priority</th>
                </tr>
              </thead>
              {sortByTime.length > 0 ? (
                <tbody>
                  {sortByTime.map((lead) => (
                    <tr key={lead._id}>
                      <td>
                        <Link
                          to={`/lead-details/${lead._id}`}
                          className="text-decoration-none text-black link-body-emphasis"
                        >
                          {lead.name}
                        </Link>
                      </td>
                      <td>{lead.status}</td>
                      <td>{lead.timeToClose}</td>
                      <td>{lead.priority}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td> No lead found.</td>
                  </tr>
                </tbody>
              )}
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SalesAgentView;
