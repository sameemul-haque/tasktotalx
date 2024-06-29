import { useEffect, useState } from "react";
import { auth } from "../services/firebase";

import toast from "react-hot-toast";
import signupimage from "../assets/signup-image.png";

const Signup = () => {

  return (
    <>
      <div className="main-container">
        <div>
          <img src={signupimage} alt="login image" className="login-image" />
        </div>

        <div className="login-container">
          <h1>Signup</h1>
          <h5>Let’s get you all set up so you can access your personal account.</h5>
          <div className="name-container">
            <div className="inputGroup firstName">
              <input type="text" required autocomplete="off" />
              <label for="fname">First name</label>
            </div>
            <div className="inputGroup lastName">
              <input type="text" required autocomplete="off" />
              <label for="lname">Last name</label>
            </div>
          </div>
          <div className="inputGroup">
            <input type="email" required autocomplete="off" />
            <label for="email">Email</label>
          </div>
          <div className="tc-container">
            <input type="checkbox" name="terms-conditions" id="terms-conditions" />
            <label for="terms-conditions" >I agree to all the <span className="red-text">Terms</span> and <span className="red-text">Privacy Policies</span></label>
          </div>
          <div className="phone-btn">
            <button id="create-btn">
              <span>{"Create Account"}</span>
            </button>
          </div>
          <p className="already-have-an-account">Already an account? <span className="red-text">Login</span></p>
        </div>
      </div>
    </>
  );
};

export default Signup;
