import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LeadProvider } from './contexts/LeadContext';
import Header from './components/Header';
import Home from './pages/Home';
import Leads from './pages/Leads';
import AddLead from './pages/AddLead';
import Agents from './pages/Agents';
import AddAgent from './pages/AddAgent';
import LeadDetails from './pages/LeadDetails';
import LeadStatusView from './pages/LeadStatusView';
import SalesAgentView from './pages/SalesAgentView';
import Sales from './pages/Sales';
import AddTag from './pages/AddTag';
import Reports from './pages/Reports';

function App() {
  return (
    <LeadProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/add-lead" element={<AddLead />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/add-agent" element={<AddAgent />} />
          <Route path="/lead-details/:id" element={<LeadDetails />} />
          <Route path="/edit-lead/:id" element={<AddLead />} />
          <Route
            path="/lead-status-view/:status"
            element={<LeadStatusView />}
          />
          <Route path="/sales-agent-view/:name" element={<SalesAgentView />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/add-tag" element={<AddTag />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Router>
    </LeadProvider>
  );
}

export default App;
