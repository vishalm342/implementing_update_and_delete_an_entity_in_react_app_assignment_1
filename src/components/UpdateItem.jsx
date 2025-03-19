/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";


const UpdateItem = ({ item, apiUri }) => {
  // 1. Create state for the form
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when item prop changes
  useEffect(() => {
    if (item) {
      setFormData({
        
        name: item.name,
        status: item.status,
      });
    }
  }, [item]);

  // 3. Create a function to handle the form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 2. Create a function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${apiUri}/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update the door");
      }

      const updatedItem = await response.json();
      setMessage(`Door "${updatedItem.name}" updated successfully!`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!item) {
    return <div>No item data available.</div>;
  }

  return (
    <div className="update-form-container">
      <div className="current-item">
        <h2>Current Door Information</h2>
        <p>
          <strong>ID:</strong> {item.id}
        </p>
        <p>
          <strong>Name:</strong> {item.name}
        </p>
        <p>
          <strong>Status:</strong> {item.status}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="update-form">
        <h2>Update Door</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select status...</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="locked">Locked</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Door"}
        </button>

        {message && (
          <div
            className={
              message.includes("Error") ? "error-message" : "success-message"
            }
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateItem;
