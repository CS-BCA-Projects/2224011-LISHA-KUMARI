// src/pages/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [reportedItems, setReportedItems] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch reports and users when the admin logs in
  useEffect(() => {
    // Fetching reported items
    const fetchReports = async () => {
      const response = await fetch("http://localhost:4000/api/reports");
      const data = await response.json();
      setReportedItems(data);
    };

    // Fetching users (you may want to protect this route)
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:4000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    };

    fetchReports();
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Reported Items</h2>
        <ul>
          {reportedItems.map((item) => (
            <li key={item._id} className="border p-4 my-2">
              <p><strong>Item Name:</strong> {item.itemName}</p>
              <p><strong>Status:</strong> {item.status}</p>
              <Link to={`/admin/reports/${item._id}`} className="text-blue-500">View Details</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="border p-4 my-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                Delete User
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
