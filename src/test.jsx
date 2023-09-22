import React, { useState } from "react";

const ClientOnboardingForm = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    email: "",
    contactNo: "",
    type: "Named",
    province: "Ontario",
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
    <div className="container mt-2 col-md-6">
      <h1 className="text-center mb-4">Client Onboarding Form</h1>
      <form onSubmit={handleSubmit}>
        <form onSubmit={handleSubmit}>
          <h2>Section 1</h2>
          <div className="row mb-2 ">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="city" className="form-label">
                City:
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="postalCode" className="form-label">
                Postal Code:
              </label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                placeholder="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <input
              type="text"
              className="form-control"
              id="country"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contactNo" className="form-label">
              Contact No:
            </label>
            <input
              type="tel"
              className="form-control"
              id="contactNo"
              placeholder="Contact No"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Section 2 and buttons remain unchanged */}
        </form>

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
          <button
            type="submit"
            className={`btn ${
              editingClientId !== null ? "btn-primary" : "btn-success"
            }`}
          >
            {editingClientId !== null ? "Update" : "Submit"}
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

      <h2 className="mt-4 ">Client List</h2>
      <ul className="list-group p-4">
        {clients.map((client) => (
          <li
            key={client.id}
            className="pt-3 list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="flex">
              <div className="row">
                <div className="col">
                  <div>First Name: {client.firstName}</div>
                  <div>Last Name: {client.lastName}</div>
                  <div>Address: {client.address}</div>
                  <div>City: {client.city}</div>
                  <div>Postal Code: {client.postalCode}</div>
                  <div>Country {client.country}</div>
                  <div>Email: {client.email}</div>
                  <div>Contact No: {client.contactNo}</div>
                </div>
              </div>
            </div>
            <div>
              <button
                className="btn btn-warning me-2"
                onClick={() => handleEdit(client.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(client.id)}
              >
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
