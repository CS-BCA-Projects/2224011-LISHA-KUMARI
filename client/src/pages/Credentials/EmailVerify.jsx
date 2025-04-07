import React, { useState } from 'react';
import axios from 'axios';

const EmailVerify = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  
  const userId = localStorage.getItem("userId"); // Or get from context/session

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/verify-account',
        { userId, otp },
        { withCredentials: true }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error verifying email');
    }
  };

  return (
    <div>
      <h2>Verify Email</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerify}>Verify Email</button>
      <p>{message}</p>
    </div>
  );
};

export default EmailVerify;
