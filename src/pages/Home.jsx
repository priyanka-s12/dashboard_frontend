import Sidebar from '../components/Sidebar';
import useLead from '../contexts/LeadContext';
import { useSearchParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { leads, loading, error, getLeads } = useLead();

  console.log(leads, loading, error);

  const leadStatuses = [
    'New',
    'Contacted',
    'Qualified',
    'Proposal Sent',
    'Closed',
  ];

  const selectedStatus = searchParams.get('status') || 'New';

  const leadsStatusCount = leads?.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});
  //   console.log(leadsStatusCount);

  const filteredLeads = leads?.filter((lead) => lead.status === selectedStatus);
  // console.log(selectedStatus, filteredLeads);

  useEffect(() => {
    getLeads();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
          <Sidebar />
        </div>
        <div className="col-md-10 p-3">
          <main className="container-fluid">
            <div className="row">
              <h3 className="mb-3">App Overview</h3>
              <hr />

              <section className="container">
                <div className="d-flex justify-content-between mb-3">
                  <h4>Leads: </h4>
                  <Link className="btn btn-outline-dark" to="/add-lead">
                    Add New Lead
                  </Link>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <div className="row">
                  {leads?.map((lead) => (
                    <div key={lead._id} className="col-md-3 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <Link
                            className="card-title text-decoration-none text-black fs-5 fw-medium"
                            to={`/lead-details/${lead._id}`}
                          >
                            {lead.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <hr />

              <section className="container">
                <h4 className="mb-3">Lead Status: </h4>
                <div className="row">
                  {leadStatuses.map((leadStatus, index) => (
                    <div className="col-md-2 mb-3" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <Link
                            to={`/lead-status-view/${leadStatus}`}
                            className="text-decoration-none text-black fs-5 fw-medium link-body-emphasis"
                          >
                            {leadStatus}
                          </Link>
                          <p className="mt-3">
                            {leadsStatusCount[leadStatus] || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <hr />

              <section className="container">
                <h4 className="mb-3">Quick Filters: </h4>
                <ul className="nav nav-pills">
                  {leadStatuses.map((leadStatus) => (
                    <li className="nav-item" key={leadStatus}>
                      <button
                        className={`btn me-3 mb-3 ${
                          selectedStatus === leadStatus
                            ? 'btn-dark'
                            : 'btn-outline-dark'
                        }`}
                        onClick={() => setSearchParams({ status: leadStatus })}
                        value={leadStatus}
                      >
                        {leadStatus}
                      </button>
                    </li>
                  ))}
                </ul>

                <div>
                  {leads && leads.length > 0 ? (
                    <ul className="list-group ">
                      {filteredLeads.length > 0 ? (
                        <div>
                          {filteredLeads.map((lead) => (
                            <li className="list-group-item w-75" key={lead._id}>
                              {lead.name}
                            </li>
                          ))}
                        </div>
                      ) : (
                        <p>No "{selectedStatus}" lead found.</p>
                      )}
                    </ul>
                  ) : (
                    <p className="mt-3">No leads found.</p>
                  )}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Home;
