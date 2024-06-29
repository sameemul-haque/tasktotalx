import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPhoneNumber,
  addUser,
  changeStateFalse,
  successTrue,
} from "../feature/otpSlice";
import toast from "react-hot-toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../services/firebase";
import loginimage from "../assets/login-image.png";

const Verify = () => {
  const dispatch = useDispatch();
  const { user, phoneNumber } = useSelector((state) => state.otp);
  const [otp, setOtp] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState(false);
  const [otpTime, setOtpTime] = useState(40);

  const [recaptcha, setRecaptcha] = useState(null);
  useEffect(() => {
    let recaptchaVerifier;
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
    });
    setRecaptcha(recaptchaVerifier);
  }, []);

  useEffect(() => {
    if (otpTime > 0) {
      const intervalId = setInterval(() => {
        setOtpTime(otpTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [otpTime]);

  const resendOTP = async () => {
    if (phoneNumber == null) {
      toast.error("something wrong try to again send otp");
      return;
    }

    if (isButtonDisabled) {
      return;
    }

    try {
      setIsButtonDisabled(true);
      const confirmation = await signInWithPhoneNumber(
        auth,
        "+" + phoneNumber,
        recaptcha
      );
      toast.success("otp sended successfully");
      dispatch(addUser(confirmation));
      dispatch(addPhoneNumber(phoneNumber));
      dispatch(changeStateFalse());
      setOtpTime(40);
    } catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          toast.error("Too many requests. Please try again later.");
          break;
        case "auth/invalid-phone-number":
          toast.error("The phone number is invalid.");
          break;
        default:
          toast.error("Something went wrong. Please try again later.");
          break;
      }
      console.log(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const verifyOTP = async () => {
    if (isVerifyButtonDisabled) {
      return;
    }

    setIsVerifyButtonDisabled(true);
    try {
      const data = await user.confirm(otp);
      dispatch(successTrue());
      console.log(data);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-verification-code":
          toast.error("The verification code is invalid.");
          break;
        case "auth/code-expired":
          toast.error("The verification code is expired.");
          break;
        default:
          toast.error("Something went wrong. Please try again later.");
          break;
      }
      console.log(error);
    } finally {
      setIsVerifyButtonDisabled(false);
    }
  };

  return (
    <div>
      <div className="main-container">

        <div className="login-container">
          <h1>Verify code</h1>
          <h5>An authentication code has been sent to your email.</h5>
          <div className="inputGroup">
            <input
              type="number"
              required
              autocomplete="off"
              value={otp}
              disabled={false}
              autoFocus
              onChange={(e) => setOtp(e.target.value)} />
            <label for="otpcode">Enter code</label>
          </div>

          <div className="otp-details">
            <p>Didn't receive a code?</p>
            <span className="red-text" onClick={() => resendOTP()}>{isButtonDisabled ? "Sending..." : "Resend"}</span>
          </div>

          <div className="phone-btn">
            <button
              onClick={() => verifyOTP()}
              id="verify-btn"
              disabled={isVerifyButtonDisabled}
            >
              {isVerifyButtonDisabled ? "Checking..." : "Verify"}
            </button>
          </div>
        </div>
        <div>
          <img src={loginimage} alt="login image" className="login-image" />
        </div>
      </div>
      <div id="recaptcha"></div>
    </div>
  );
};

export default Verify;
