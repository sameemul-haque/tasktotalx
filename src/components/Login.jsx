import { useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../services/firebase";
import { useDispatch } from "react-redux";
import { addPhoneNumber, addUser, changeStateFalse } from "../feature/otpSlice";
import toast from "react-hot-toast";
import loginimage from "../assets/login-image.png";

const Login = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [recaptcha, setRecaptcha] = useState(null);

  const [showCaptcha, setShowCaptcha] = useState(true);

  useEffect(() => {
    let recaptchaVerifier;
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
    });
    setRecaptcha(recaptchaVerifier);
  }, []);

  const sendOTP = async () => {
    if (phone == "") {
      toast.error("please enter a phone number");
      return;
    }

    if (isButtonDisabled) {
      return;
    }

    try {
      setIsButtonDisabled(true);
      const formattedPhone = phone.startsWith("+") ? phone : "+91" + phone;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptcha
      );

      toast.success("otp sended successfully");
      dispatch(addUser(confirmation));
      dispatch(addPhoneNumber(phone));
      dispatch(changeStateFalse());
      setShowCaptcha(false);
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

  return (
    <>
      <div className="main-container">

        <div className="login-container">
          <h1>Login</h1>
          <h5>Login to access your travelwise account</h5>
          <div className="inputGroup">
            <input type="phone" autoFocus required autoComplete="off" value={phone}
              onChange={(e) => setPhone(e.target.value)} />
            <label htmlFor="phnumber">Enter Mobile Number</label>
          </div>
          <div className="phone-btn" onClick={() => sendOTP()}>
            <button
              id="signup-btn"
              disabled={isButtonDisabled}
            >
              <span>{isButtonDisabled ? "Sending..." : "Get OTP"}</span>
            </button>
          </div>
          <p className="dont-have-an-account">Dont have an account? <span className="red-text">Sign up</span></p>
        </div>

        <div>
          <img src={loginimage} alt="login image" className="login-image" />
        </div>
      </div>
      {showCaptcha && <div id="recaptcha"></div>}
    </>
  );
};

export default Login;
