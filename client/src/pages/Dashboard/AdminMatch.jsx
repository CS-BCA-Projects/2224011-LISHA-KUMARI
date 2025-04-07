import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminMatch = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        console.log("Fetching lost items...");
        const lostRes = await axios.get("http://localhost:4000/api/report/lost", {
          withCredentials: true,
        });
        console.log("Lost items response:", lostRes.data);

        console.log("Fetching found items...");
        const foundRes = await axios.get("http://localhost:4000/api/report/found", {
          withCredentials: true,
        });
        console.log("Found items response:", foundRes.data);

        setLostItems(lostRes.data || []);
        setFoundItems(foundRes.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching items:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const matchItems = async (lostId, foundId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/admin/match",
        { lostId, foundId },
        { withCredentials: true }
      );
      if (res.data.success) {
        alert("Items matched and users notified!");
        setLostItems((prev) => prev.filter((item) => item._id !== lostId));
        setFoundItems((prev) => prev.filter((item) => item._id !== foundId));
        // Refetch to ensure consistency
        const [lostRes, foundRes] = await Promise.all([
          axios.get("http://localhost:4000/api/report/lost", { withCredentials: true }),
          axios.get("http://localhost:4000/api/report/found", { withCredentials: true }),
        ]);
        setLostItems(lostRes.data || []);
        setFoundItems(foundRes.data || []);
      } else {
        throw new Error(res.data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error matching items:", error.response?.data || error.message);
      alert(`Failed to match items: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Manual Matching Panel</h2>
      {lostItems.length === 0 ? (
        <p>No lost items available for matching.</p>
      ) : foundItems.length === 0 ? (
        <div>
          <p>No found items available for matching.</p>
          <div className="space-y-6">
            {lostItems.map((lost) => (
              <div key={lost._id} className="border p-4 rounded-lg">
                <p><strong>Lost Item:</strong> {lost.itemName}</p>
                <p><strong>Description:</strong> {lost.description}</p>
                <p><strong>Reported By:</strong> {lost.reportedBy?.name || "Unknown"}</p>
                <p className="text-yellow-500">No found items to match at the moment.</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {lostItems.map((lost) => (
            <div key={lost._id} className="border p-4 rounded-lg">
              <p><strong>Lost Item:</strong> {lost.itemName}</p>
              <p><strong>Description:</strong> {lost.description}</p>
              <p><strong>Reported By:</strong> {lost.reportedBy?.name || "Unknown"}</p>
              <div className="mt-2">
                <h3 className="font-semibold">Possible Matches:</h3>
                {foundItems.map((found) => (
                  <div key={found._id} className="ml-4 mt-2">
                    <p><strong>Found Item:</strong> {found.itemName}</p>
                    <p><strong>Description:</strong> {found.description}</p>
                    <button
                      onClick={() => matchItems(lost._id, found._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                    >
                      Match
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMatch;