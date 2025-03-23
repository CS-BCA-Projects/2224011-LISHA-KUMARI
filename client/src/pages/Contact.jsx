import React, { useState, useEffect, useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const { backendUrl , userData } = useContext(AppContent);

  const userId = userData?._id || null

  console.log(userId);
  

  function sendMessage(){

  }
  // Fetch Messages
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const response = await axios.get(`${backendUrl}/messages/${userId}`);
  //       setMessages(response.data || []);
  //     } catch (error) {
  //       console.error("Error fetching messages:", error);
  //     }
  //   };

  //   if (userId) fetchMessages();
  // }, [userId]);

  // Fetch All Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/all-users` , {
          withCredentials : true
        });

        console.log(response.data);
        
        const filteredUsers = response.data?.users?.filter((user) => user._id !== userId) || []

        setAllUsers( filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Send Message
  // const sendMessage = async () => {
  //   if (!selectedUser || !message.trim()) return alert("Select a user and enter a message.");

  //   try {
  //     const response = await axios.post(`${backendUrl}/api/contact/send`, {
  //       senderId: userId,
  //       receiverId: selectedUser,
  //       reportId: "123456789",
  //       message,
  //     });

  //     if (response.status === 200) {
  //       alert("Message sent successfully!");
  //       setMessage("");
  //     }
  //   } catch (error) {
  //     console.error("Failed to send message:", error);
  //     alert("Failed to send message.");
  //   }
  // };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Contact</h2>

      <div className="mb-4">
        <label className="block mb-2">Select User to Contact:</label>
        <select
          className="border p-2 w-full"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select a user</option>
          {allUsers.length > 0 &&
            allUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
        </select>
      </div>

      <textarea
        className="border p-2 w-full mb-4"
        rows="3"
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={sendMessage}
      >
        Send Message
      </button>

      <h3 className="text-xl font-semibold mt-6">Message History</h3>
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div key={msg._id} className="p-4 border border-gray-300 rounded mb-2">
            <p><strong>From:</strong> {msg.senderId.name}</p>
            <p><strong>Message:</strong> {msg.message}</p>
            <p><strong>Time:</strong> {new Date(msg.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
    </>
  );
};

export default Contact;
