import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateReportedItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: '',
    location: '',
    description: '',
    contact: '',
    status: 'unclaimed',
  });

  // Fetch the existing item details
  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return; // Prevent API call if ID is missing
      try {
        const response = await fetch(`http://localhost:4000/api/reports/${id}`);
        if (!response.ok) throw new Error("Failed to fetch item");

        const data = await response.json();
        setFormData((prev) => ({ ...prev, ...data })); // Preserve structure
      } catch (error) {
        console.error("Error fetching item:", error);
        alert("Error fetching item details.");
      }
    };

    fetchItem();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/reports/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error updating item");
      }

      alert("Item updated successfully!");
      navigate('/view-reported-items'); // Navigate after update
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to update item: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Update Reported Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Info"
          value={formData.contact}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="unclaimed">Unclaimed</option>
          <option value="claimed">Claimed</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Item
        </button>
      </form>
    </div>
  );
};

export default UpdateReportedItem;
