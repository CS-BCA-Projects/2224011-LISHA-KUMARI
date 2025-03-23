import React, { useContext, useEffect, useState } from 'react';
import { AppContent } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const ViewReportedItems = () => {
  const [reportedItems, setReportedItems] = useState([]);
  const [error, setError] = useState(null);


  const {backendUrl} = useContext(AppContent)

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`${backendUrl}/api/report/all-item-reports` , {
          withCredentials : true
        })
        
        const allItems = response.data?.allItems || []
        if (allItems){
          setReportedItems(allItems)
        }

      } catch (error) {
        toast.error(error?.response?.message)
      }
    };

    fetchData();
  }, []);

  // Handle claiming the report
  const handleClaim = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/reports/claim/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setReportedItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          )
        );
        alert("Item claimed successfully!");
      } else {
        alert("Error claiming the item");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to claim item");
    }
  };

  // Handle deleting the report
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/reports/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReportedItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        alert("Item deleted successfully!");
      } else {
        alert("Error deleting the item");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete item");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Reported Items</h2>
      <div className="space-y-4 gap-x-4">
        {error && <p className="text-red-500">{error}</p>}
        {reportedItems.length === 0 ? (
          <p>No reported items found.</p>
        ) : (
          reportedItems?.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg">{item.itemName}</h3>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Contact:</strong> {item.reportedBy?.name}</p>
              <div className='flex gap-x-4 my-4 '>
              {item.status === "unclaimed" ? (
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md  "
                  onClick={() => handleClaim(item._id)}
                >
                  Claim Item
                </button>
              ) : (
                <p className="text-green-500">Item Claimed</p>
              )}
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md"
                onClick={() => handleDelete(item._id)}
              >
                Delete Item
              </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewReportedItems;
