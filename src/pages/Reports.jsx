import Sidebar from '../components/Sidebar';
import TotalLeadsReport from '../components/TotalLeadsReport';
import LeadsStatusReport from '../components/LeadsStatusReport';
import LeadsClosedByAgent from '../components/LeadsClosedByAgent';
import LeadsClosedLastWeek from '../components/LeadsClosedLastWeek';

function Reports() {
  return (
    <>
      <div className="row">
        <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
          <Sidebar />
        </div>
        <div className="col-md-10 p-3">
          <main className="container-fluid">
            <h3 className="mb-3">Reports Overview</h3>
            <hr />

            <div className="row">
            <section className="col-md-6 mb-5">
              <h4 className="text-center">Total Leads Closed & in Pipeline</h4>
              <TotalLeadsReport />
            </section>
            <section className="col-md-6 mb-5">
              <h4 className="text-center">Leads Closed by Sales Agent</h4>
              <LeadsClosedByAgent />
            </section>
            </div>

            <div className="row">
              <section className="col-md-6 mb-5">
                <h4 className="text-center">Lead Status Distribution</h4>
                <LeadsStatusReport />
              </section>
              <section className="col-md-6 mb-5">
                <h4 className="text-center">Leads Closed Last Week</h4>
                <LeadsClosedLastWeek />
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Reports;
