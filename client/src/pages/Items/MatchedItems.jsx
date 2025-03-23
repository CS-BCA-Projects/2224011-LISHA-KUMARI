import React, { useState, useEffect } from 'react';

const MatchedItems = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch matched items from the backend
    const fetchMatches = async () => {
      const response = await fetch("http://localhost:4000/api/reports/matches");
      const data = await response.json();
      setMatches(data);
    };

    fetchMatches();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Matched Items</h2>
      {matches.length > 0 ? (
        matches.map(({ lostItem, foundItem }) => (
          <div key={lostItem._id} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="font-bold">Lost Item</h3>
            <p><strong>Item Name:</strong> {lostItem.itemName}</p>
            <p><strong>Description:</strong> {lostItem.description}</p>
            <p><strong>Location:</strong> {lostItem.location}</p>
            <p><strong>Time:</strong> {new Date(lostItem.time).toLocaleString()}</p>

            <h3 className="font-bold mt-4">Found Item</h3>
            <p><strong>Item Name:</strong> {foundItem.itemName}</p>
            <p><strong>Description:</strong> {foundItem.description}</p>
            <p><strong>Location:</strong> {foundItem.location}</p>
            <p><strong>Time:</strong> {new Date(foundItem.time).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default MatchedItems;
