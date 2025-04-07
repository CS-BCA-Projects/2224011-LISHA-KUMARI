import React, { useState, useEffect, useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";

const Notifications = () => {
  const { backendUrl, userData } = useContext(AppContent);
  const userId = userData?._id;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!userId) {
          console.warn("userId is undefined, skipping fetch");
          return;
        }
        const response = await axios.get(`${backendUrl}/api/notifications/${userId}`, {
          withCredentials: true, // Prefer withCredentials over Authorization for consistency
        });
        setNotifications(response.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    if (userId) fetchNotifications();
  }, [backendUrl, userId]);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div key={notif._id} className="mb-4 p-4 border border-gray-300 rounded bg-blue-50">
              <p>{notif.message}</p>
              {notif.contactInfo && (
                <p><strong>Contact:</strong> {notif.contactInfo}</p>
              )}
              <p><strong>Time:</strong> {new Date(notif.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  );
};

export default Notifications;