import Sidebar from '../components/Sidebar';
import useLead from '../contexts/LeadContext';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function LeadDetails() {
  const { id } = useParams();
  console.log(id);

  const { leads, loading, error, agents, getLeads } = useLead();
  console.log(leads);

  const findLead = leads?.find((lead) => lead._id === id);
  console.log(findLead);

  useEffect(() => {
    getLeads();
  }, [id]);

  return (
    <>
      <div className="row">
        <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
          <Sidebar />
        </div>
        <div className="col-md-10 p-3">
          <main className="container-fluid">
            {findLead ? (
              <div>
                <h3 className="mb-3">Lead Management - {findLead.name}</h3>
                <hr />
                <h4 className="mb-3">Lead Details</h4>
                <table className="table table-bordered w-75">
                  <tbody>
                    <tr>
                      <th>Lead Name: </th>
                      <td>{findLead.name}</td>
                    </tr>
                    <tr>
                      <th>Sales Agent: </th>
                      <td>{findLead.salesAgent.name}</td>
                    </tr>
                    <tr>
                      <th>Lead Source: </th>
                      <td>{findLead.source}</td>
                    </tr>
                    <tr>
                      <th>Lead Status: </th>
                      <td>{findLead.status}</td>
                    </tr>
                    <tr>
                      <th>Priority: </th>
                      <td>{findLead.priority}</td>
                    </tr>
                    <tr>
                      <th>Time to close: </th>
                      <td>{findLead.timeToClose} Days</td>
                    </tr>
                    <tr>
                      <th>Tags: </th>
                      <td>
                        {findLead.tags.map((tag, index) => (
                          <button
                            className="btn btn-outline-primary me-2"
                            key={index}
                          >
                            {tag}
                          </button>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <Link
                    className="btn btn-primary"
                    to={`/edit-lead/${findLead._id}`}
                    state={findLead}
                  >
                    Edit Lead Details
                  </Link>
                </div>
                <hr />
              </div>
            ) : (
              <>{loading && <p>Loading...</p>}</>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default LeadDetails;
