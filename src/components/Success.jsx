import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from "../services/firebase";
import { removeUser, changeStateTrue } from '../feature/otpSlice';

const Success = () => {
  const phoneNumber = useSelector((state) => state.otp.phoneNumber);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(removeUser());
      dispatch(changeStateTrue());
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className='success-container'>
      <h1>{phoneNumber}</h1>
      <div className="phone-btn" onClick={handleLogout}>
        <button id="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Success;
