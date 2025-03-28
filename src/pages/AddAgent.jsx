import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import axios from 'axios';

function AddAgent() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        'https://anvaya-dashboard-backend.vercel.app/api/agents',
        formData
      );

      console.log(response);
      console.log('Added agent', response);
      setMessage(true);
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-2 min-vh-100 shadow p-3 mb-3 bg-body-tertiary rounded">
          <Sidebar />
        </div>
        <div className="col-md-10 p-3">
          <main className="container-fluid">
            {message && (
              <p className="alert alert-success">Agent added successfully</p>
            )}
            <form className="w-50 mb-5" onSubmit={handleSubmit}>
              <h3 className="mb-3">Add New Sales Agent</h3>

              <label className="form-label">Agent Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="form-control"
                onChange={handleInput}
                required
              />
              <br />

              <label className="form-label">Eamil Address:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="form-control"
                onChange={handleInput}
                required
              />
              <br />
              <button type="submit" className="btn btn-primary mx-auto">
                Add New Agent
              </button>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}

export default AddAgent;
