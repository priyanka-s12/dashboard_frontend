import Sidebar from '../components/Sidebar';
import useLead from '../contexts/LeadContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Agents() {
  const { agents, agentsLoading, agentsError, getAgents } = useLead();

  useEffect(() => {
    getAgents();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
          <Sidebar />
        </div>
        <div className="col-md-10 p-3">
          <main className="container-fluid">
            <h3 className="mb-3">Sales Agent Management </h3>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <h4>Sales Agent List</h4>
              <Link className="btn btn-outline-dark" to="/add-agent">
                Add New Agent
              </Link>
            </div>

            <section>
              {agentsLoading && <p>Loading...</p>}
              {agentsError && <p>{error}</p>}
              <table className="table w-75 table-bordered">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                {agents.length > 0 ? (
                  <tbody>
                    {agents?.map((agent) => (
                      <tr key={agent._id}>
                        <td>{agent.name}</td>
                        <td>{agent.email}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody className="mt-3">
                    <tr>
                      <td>No agent found</td>
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

export default Agents;
