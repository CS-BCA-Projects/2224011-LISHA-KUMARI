// src/pages/BrowseLostFound.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AppContent } from '../../context/AppContext'; // Import context
import axios from "axios";

const BrowseLostFound = () => {
  const { backendUrl, userData } = useContext(AppContent); // Access context
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(''); // For filtering by 'lost' or 'found'
  const [searchTerm, setSearchTerm] = useState(''); // For searching by item name or description

  // Fetch data from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/report/all-item-reports`, {
          withCredentials: true, // Send cookies/session
        });
       
        console.log("Full API Response:", response.data); // Log the full response
        if (response.data.success === false) {
          throw new Error(response.data.message || "Failed to fetch items");
        }
        setItems(response.data.allItems || [])
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.error("Error fetching items:", err.response?.data || err.message);
      }
    };

    fetchItems();
  }, []);

  // Handle filter change (lost or found)
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term
  };

  // Filter and search items based on filter and search term
  const filteredAndSearchedItems = items.filter((item) => {
    const matchesFilter = filter ? item.type.toLowerCase() === filter.toLowerCase() : true;
    const matchesSearch =
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Browse Lost & Found Items</h2>

      {/* Filter options */}
      <div className="mb-4">
        <label className="mr-2">Filter by Type:</label>
        <select value={filter} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <label htmlFor="search" className="mr-2">Search by Item Name or Description:</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="p-2 border rounded w-full"
        />
      </div>

      {/* Display error if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display items */}
      <div className="space-y-4">
        {filteredAndSearchedItems.length === 0 ? (
          <p>No items to display.</p>
        ) : (
          filteredAndSearchedItems.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">{item.itemName}</h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Contact:</strong> {item.reportedBy?.email || "N/A"}</p>
              <p><strong>Status:</strong> {item.type}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseLostFound;
