import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [reportedItems, setReportedItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryRes, itemRes, usersRes] = await Promise.all([
          axios.get("http://localhost:4000/api/admin/summary", {
            withCredentials: true ,
          }),
          axios.get("http://localhost:4000/api/report/all-item-reports", {
            withCredentials: true ,
          }),
          axios.get("http://localhost:4000/api/user/all-users", {
            withCredentials: true ,
          }),
        ]);
        setSummary(summaryRes.data);
        setReportedItems(itemRes.data.allItems || []);
        setUsers(usersRes.data.users || []);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/admin/users/${userId}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
      toast.error(`Failed to delete user: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      console.log("Attempting to delete report with ID:", reportId); // Debug log
      const response = await axios.delete(`http://localhost:4000/api/report/delete-item/${reportId}`, {
        withCredentials: true,
      });
      if (response.data.success){
        setReportedItems(reportedItems.filter((item) => item._id !== reportId));
        toast.success("Report deleted successfully");
      } else {
        throw new Error(response.data.message || "Unknown error");
      }
      
    } catch (error) {
      console.error("Error deleting report:", error.response?.data || error.message);
      toast.error(`Failed to delete report: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl">{summary.totalUsers || 0}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Total Reports</h2>
          <p className="text-2xl">{summary.totalReports || 0}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Matched Reports</h2>
          <p className="text-2xl">{summary.matchedReports || 0}</p>
        </div>
      </div>

      {/* Reported Items */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">All Reported Items</h2>
        {reportedItems.length > 0 ? (
          <div className="space-y-4">
            {reportedItems.map((item) => (
              <div key={item._id} className="border p-4 rounded-lg shadow-sm">
                <p><strong>Item:</strong> {item.itemName}</p>
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Reported By:</strong> {item.reportedBy?.name || "Unknown"}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <div className="mt-2">
                  <Link to={`/update-reported-item/${item._id}`} className="text-blue-500 mr-4">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteReport(item._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reported items.</p>
        )}
      </div>

      {/* Manage Users */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        {users.length > 0 ? (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user._id} className="border p-4 rounded-lg shadow-sm">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Link to Matching Panel */}
      <div>
        <Link
          to="/admin-match"
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
        >
          Go to Matching Panel
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;