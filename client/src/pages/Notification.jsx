import React, { useState, useEffect } from 'react';

const Notifications = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await fetch(`http://localhost:4000/api/reports/notifications/${userId}`);
            const data = await response.json();
            setNotifications(data);
        };

        fetchNotifications();
    }, [userId]);

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            {notifications.length > 0 ? (
                notifications.map((notif) => (
                    <div key={notif._id} className="mb-4 p-4 border border-gray-300 rounded">
                        <p>{notif.message}</p>
                        <p><strong>Contact:</strong> {notif.contactInfo}</p>
                    </div>
                ))
            ) : (
                <p>No new notifications.</p>
            )}
        </div>
    );
};

export default Notifications;
