import Sidebar from '../components/Sidebar';
import useLead from '../contexts/LeadContext';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

function AddLead() {
  const { agents, getAgents, tags } = useLead();

  const [formData, setFormData] = useState({
    name: '',
    source: '',
    salesAgent: '',
    status: '',
    priority: '',
    timeToClose: '',
    tags: [],
  });
  const [message, setMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

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

  // const leadTags = [
  //   { label: 'High Value', value: 'High Value' },
  //   { label: 'Follow-up', value: 'Follow-up' },
  //   { label: 'Urgent', value: 'Urgent' },
  //   { label: 'Medium Value', value: 'Medium Value' },
  //   { label: 'Low Value', value: 'Low Value' },
  // ];

  const leadTags = tags?.map((tag) => ({ label: tag.name, value: tag._id }));
  console.log(leadTags);
  // {label: 'Medium Value', value: '67e7b134e92d087225c83a36'}

  const location = useLocation();
  // console.log(location);

  const { state: existingLead } = location;
  // console.log(existingLead);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'timeToClose' ? Number(value) : value,
    }));
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    // console.log(selected);

    setFormData((prevVal) => ({
      ...prevVal,
      tags: selected.map((tag) => tag.label),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    let response;

    try {
      if (existingLead) {
        response = await axios.put(
          `https://anvaya-dashboard-backend.vercel.app/api/leads/${existingLead._id}`,
          formData
        );
        setMessage('Lead Updated Successfully !');
      } else {
        response = await axios.post(
          'https://anvaya-dashboard-backend.vercel.app/api/leads',
          formData
        );
        setMessage('New Lead Added Successfully !');
      }

      console.log(response);
      console.log('lead', response);

      setFormData({
        name: '',
        source: '',
        salesAgent: '',
        status: '',
        priority: '',
        timeToClose: '',
        tags: [],
      });
      setSelectedOptions([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (existingLead) {
      setFormData(existingLead);
    }
  }, [existingLead]);

  return (
    <div>
      <div className="row">
        <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
          <Sidebar />
        </div>
        <div className="col-md-10 p-3">
          <main className="container-fluid">
            {message && <p className="alert alert-success">{message}</p>}
            <form className="w-50 mb-5" onSubmit={handleSubmit}>
              <h3 className="mb-3">
                {existingLead ? 'Update' : 'Add New'} Lead
              </h3>

              <label className="form-label">Lead Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="form-control"
                onChange={handleInput}
                required
              />
              <br />

              <label className="form-label">Lead Source: </label>
              <select
                className="form-select"
                name="source"
                value={formData.source}
                required
                onChange={handleInput}
              >
                <option value="">Select a Source</option>
                {leadSources.map((source) => (
                  <option value={source} key={source}>
                    {source}
                  </option>
                ))}
              </select>
              <br />

              <label className="form-label">Lead Agent: </label>
              <select
                className="form-select"
                name="salesAgent"
                value={formData.salesAgent}
                required
                onChange={handleInput}
              >
                <option value="">Select a Sales Agent</option>
                {agents?.map((agent) => (
                  <option value={agent._id} key={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
              <br />

              <label className="form-label">Lead Status: </label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                required
                onChange={handleInput}
              >
                <option>Select a Status</option>
                {leadStatuses.map((status, index) => (
                  <option value={status} key={index}>
                    {status}
                  </option>
                ))}
              </select>
              <br />

              <label className="form-label">Priority: </label>
              <select
                className="form-select"
                name="priority"
                value={formData.priority}
                required
                onChange={handleInput}
              >
                <option>Select a Priority</option>
                {['High', 'Medium', 'Low'].map((priority, index) => (
                  <option value={priority} key={index}>
                    {priority}
                  </option>
                ))}
              </select>
              <br />

              <label className="form-label me-2">Time to Close:</label>
              <span className="form-text">(Number of days)</span>
              <input
                type="number"
                name="timeToClose"
                className="form-control"
                value={formData.timeToClose}
                required
                onChange={handleInput}
                placeholder="10"
              />
              <br />

              <label className="form-label me-3">Select Tags:</label>
              <Link to="/add-tag">Add New Tag</Link>
              <Select
                name="tags"
                required
                options={leadTags}
                isMulti
                value={selectedOptions}
                onChange={handleSelectChange}
              />
              <br />

              <button type="submit" className="btn btn-primary mx-auto">
                {existingLead ? 'Update' : 'Add New'} Lead
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AddLead;
