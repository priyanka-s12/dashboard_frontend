import Sidebar from '../components/Sidebar';
import useLead from '../contexts/LeadContext';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function LeadStatusView() {
  const { status } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(status);

  const { leads, loading, error, agents, getLeads, getAgents, tags, getTags } =
    useLead();
  console.log(leads);

  const filteredLeads = leads.filter((lead) => lead.status === status);
  console.log(filteredLeads);

  const selectedAgent = searchParams.get('salesAgent') || '';
  const selectedTag = searchParams.get('tag') || '';
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

  const filterByAgent =
    selectedAgent === ''
      ? filteredLeads
      : filteredLeads.filter((lead) => lead.salesAgent.name === selectedAgent);

  const filterByTag =
    selectedTag === ''
      ? filterByAgent
      : filterByAgent.filter((lead) =>
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
    <>
      <div className="row">
        <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
          <Sidebar />
        </div>
        <div className="col-md-10 p-3">
          <main className="container-fluid">
            <h3 className="mb-3">Lead List by Status - {status}</h3>
            <hr />

            <section>
              <section className="d-flex justify-content-between mb-4">
                <div>
                  <h5 className="mb-3">Filter by: </h5>
                  <div className="d-flex">
                    <select
                      className="form-select me-3"
                      onChange={(e) =>
                        updateFilter('salesAgent', e.target.value)
                      }
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
                    onChange={(e) =>
                      updateFilter('timeToClose', e.target.value)
                    }
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
                    <th scope="col">Sales Agent</th>
                    <th scope="col">Time to Close</th>
                    <th scope="col">Priority</th>
                    <th scopes="col">Tags</th>
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
                        <td>{lead.salesAgent.name}</td>
                        <td>{lead.timeToClose}</td>
                        <td>{lead.priority}</td>
                        <td>{lead.tags.map((tag) => tag).join(', ')}</td>
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
    </>
  );
}

export default LeadStatusView;
