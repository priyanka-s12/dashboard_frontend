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
        </Routes>
      </Router>
    </LeadProvider>
  );
}

export default App;
