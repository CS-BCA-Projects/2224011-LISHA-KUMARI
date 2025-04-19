import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState('request'); // 'request' or 'reset'

  // Use import.meta.env.VITE_BACKEND_URL instead of process.env
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/auth/sendResetOtp`, { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setStep('reset'); // Move to reset step after OTP is sent
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/auth/resetPassword`, { email, otp, newPassword });
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <ToastContainer />
      <div onClick={() => navigate('/')} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'>
        <span className='text-2xl font-["Pacifico"] text-indigo-600'>lofo</span>
      </div>

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-3'>
          {step === 'request' ? 'Reset Password' : 'Enter OTP & New Password'}
        </h2>
        <p className='text-center text-sm mb-6'>
          {step === 'request' ? 'Enter your email to receive an OTP' : 'Enter the OTP and your new password'}
        </p>

        <form onSubmit={step === 'request' ? handleSendOtp : handleResetPassword}>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt='' />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='bg-transparent outline-none'
              type='email'
              placeholder='Email id'
              required
            />
          </div>

          {step === 'reset' && (
            <>
              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                <img src={assets.lock_icon} alt='' />
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  className='bg-transparent outline-none'
                  type='text'
                  placeholder='OTP'
                  required
                />
              </div>
              <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                <img src={assets.lock_icon} alt='' />
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  className='bg-transparent outline-none'
                  type='password'
                  placeholder='New Password'
                  required
                />
              </div>
            </>
          )}

          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>
            {step === 'request' ? 'Send OTP' : 'Reset Password'}
          </button>
        </form>

        <p className='text-gray-400 text-center text-xs mt-4'>
          Back to{' '}
          <span onClick={() => navigate('/login')} className='text-blue-400 cursor-pointer underline'>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;