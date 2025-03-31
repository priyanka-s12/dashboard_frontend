import Sidebar from '../components/Sidebar';
import useLead from '../contexts/LeadContext';
import { useSearchParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

function Leads() {
  const { leads, loading, error, agents, getLeads, getAgents, tags, getTags } =
    useLead();
  const [searchParams, setSearchParams] = useSearchParams();

  const leadStatuses = [
    'New',
    'Contacted',
    'Qualified',
    'Proposal Sent',
    'Closed',
  ];

  const leadSources = [
    'Website',
    'Referral',
    'Cold Call',
    'Advertisement',
    'Email',
    'Other',
  ];

  const selectedStatus = searchParams.get('status') || '';
  const selectedAgent = searchParams.get('salesAgent') || '';
  const selectedSource = searchParams.get('source') || '';
  const selectedTag = searchParams.get('tag') || '';
  const selectedTimeToClose = searchParams.get('timeToClose') || '';
  const selectedPriority = searchParams.get('priority') || '';

  const updateFilter = (key, value) => {
    console.log(key, value);
    // const params = new URLSearchParams(searchParams);
    // console.log(key, value);
    // if (key === 'status' && value) {
    //   setSelectedStatus(value);
    //   params.set(key, value);
    // }
    // if (key === 'salesAgent' && value) {
    //   setSelectedAgent(value);
    //   params.set(key, value);
    // }
    // setSearchParams(params);

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
      ? leads
      : leads.filter((lead) => lead.status === selectedStatus);

  const filterByAgent =
    selectedAgent === ''
      ? filterByStatus
      : filterByStatus.filter((lead) => lead.salesAgent.name === selectedAgent);

  const filterBySource =
    selectedSource === ''
      ? filterByAgent
      : filterByAgent.filter((lead) => lead.source === selectedSource);

  const filterByTag =
    selectedTag === ''
      ? filterBySource
      : filterBySource.filter((lead) =>
          lead.tags.find((tag) => tag === selectedTag)
        );

  const filterByPriority =
    selectedPriority === ''
      ? filterByTag
      : filterByTag.filter((lead) => lead.priority === selectedPriority);

  const sortByTime =
    selectedTimeToClose === ''
      ? filterByPriority
      : filterByPriority.sort((a, b) =>
          selectedTimeToClose === 'minToMax'
            ? a.timeToClose - b.timeToClose
            : b.timeToClose - a.timeToClose
        );

  useEffect(() => {
    getLeads();
    getAgents();
    getTags();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
          <Sidebar />
        </div>
        <div className="col-md-10 p-3">
          <main className="container-fluid">
            <h3 className="mb-3">Lead List</h3>
            <hr />

            <div className="d-flex justify-content-between mb-3">
              <h4>Lead Overview: </h4>
              <Link className="btn btn-outline-dark" to="/add-lead">
                Add New Lead
              </Link>
            </div>

            <section className="d-flex justify-content-between mb-4">
              <div>
                <h5 className="mb-3">Filter by: </h5>
                <div className="d-flex">
                  <select
                    className="me-3 form-select"
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
                    className="form-select me-3"
                    onChange={(e) => updateFilter('salesAgent', e.target.value)}
                  >
                    <option value="">Select Agent</option>
                    {agents?.map((agent) => (
                      <option value={agent.name} key={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select me-3"
                    onClick={(e) => updateFilter('source', e.target.value)}
                  >
                    <option value="">Select Source</option>
                    {leadSources.map((source) => (
                      <option value={source} key={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select me-3"
                    onClick={(e) => updateFilter('tag', e.target.value)}
                  >
                    <option value="">Select Tag</option>
                    {tags.map((tag) => (
                      <option value={tag.name} key={tag._id}>
                        {tag.name}
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

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <section>
              <table className="table table-bordered">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Lead Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Sales Agent</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Time to Close</th>
                  </tr>
                </thead>
                {sortByTime.length > 0 ? (
                  <tbody>
                    {sortByTime?.map((lead) => (
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
                        <td>{lead.salesAgent.name}</td>
                        <td>{lead.priority}</td>
                        <td>{lead.timeToClose}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody className="mt-3">
                    <tr>
                      <td>No lead found</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Leads;
