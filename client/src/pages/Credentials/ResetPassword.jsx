import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const sendResetOtp = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/send-reset-otp", { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Failed to send reset OTP");
    }
  };

  const resetPassword = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/auth/reset-password", {
        email,
        otp,
        newPassword
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Error resetting password");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={sendResetOtp}>Send OTP</button>
      <br />
      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <input type="password" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={resetPassword}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
