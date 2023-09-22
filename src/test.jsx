import React, { useState } from 'react';

const ClientOnboardingForm = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    email: '',
    contactNo: '',
    type: 'Named',
    province: 'Ontario',
    directors: [],
    shareholders: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [clients, setClients] = useState([]);
  const [editingClientId, setEditingClientId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClientId !== null) {
      // Update existing client
      const updatedClients = clients.map((client) =>
        client.id === editingClientId ? { ...formData, id: client.id } : client
      );
      setClients(updatedClients);
      setEditingClientId(null);
    } else {
      // Create a new client
      setClients([...clients, { ...formData, id: Date.now() }]);
    }
    setFormData(initialFormData);
  };

  const handleEdit = (clientId) => {
    const clientToEdit = clients.find((client) => client.id === clientId);
    if (clientToEdit) {
      setFormData(clientToEdit);
      setEditingClientId(clientId);
    }
  };

  const handleDelete = (clientId) => {
    const updatedClients = clients.filter((client) => client.id !== clientId);
    setClients(updatedClients);
    setEditingClientId(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Client Onboarding Form</h1>
      <form onSubmit={handleSubmit}>
        <h2>Section 1</h2>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        {/* Repeat similar input fields for the rest of Section 1 */}
        
        <h2>Section 2</h2>
        <div className="mb-3">
          <label>Type:</label>
          <select
            className="form-select"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="Named">Named</option>
            <option value="Numbered">Numbered</option>
          </select>
        </div>
        {/* Render dropdowns and tables for Directors and Shareholders */}
        
        <div className="d-grid gap-2">
          <button type="submit" className={`btn ${editingClientId !== null ? 'btn-primary' : 'btn-success'}`}>
            {editingClientId !== null ? 'Update' : 'Submit'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFormData(initialFormData)}
          >
            Clear
          </button>
        </div>
      </form>

      <h2 className="mt-4">Client List</h2>
      <ul className="list-group">
        {clients.map((client) => (
          <li key={client.id} className="list-group-item d-flex justify-content-between align-items-center">
            {client.firstName} {client.lastName}
            <div>
              <button className="btn btn-warning me-2" onClick={() => handleEdit(client.id)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(client.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientOnboardingForm;