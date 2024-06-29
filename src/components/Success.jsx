import React from 'react';
import { useSelector } from 'react-redux';

const Success = () => {
  const phoneNumber = useSelector((state) => state.otp.phoneNumber);
  function refresh() {
    window.location.reload();
  }
  return (
    <div className='success-container'>
      <h1>{phoneNumber}</h1>
      <div className="phone-btn">
        <button onClick={refresh} id="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Success;
