import Sidebar from '../components/Sidebar';
import useLead from '../contexts/LeadContext';
import { useEffect } from 'react';

function Sales() {
  const { leads, loading, error, getLeads } = useLead();
  console.log(leads);

  return (
    <div>
      <div className="row">
        <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
          <Sidebar />
        </div>
        <div className="col-md-10 p-3">
          <main className="container-fluid">
            <h3 className="mb-3">Sales Details</h3>
            <hr />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="row">
              {leads.length > 0 ? (
                <>
                  {leads.map((lead) => (
                    <div className="col-md-3 mb-3" key={lead._id}>
                      <div className="card">
                        <div className="card-header">
                          <h5>{lead.name}</h5>
                        </div>
                        <div className="card-body">
                          <p>
                            <span className="fw-medium">Status: </span>
                            {lead.status}
                          </p>
                          <p>
                            <span className="fw-medium">Sales Agent: </span>
                            {lead.salesAgent.name}
                          </p>
                          <p>
                            <span className="fw-medium">Priority: </span>
                            {lead.priority}
                          </p>
                          <p>
                            <span className="fw-medium">Time to close: </span>
                            {lead.timeToClose}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p>No lead found</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Sales;
