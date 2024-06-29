import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Verify from "./components/Verify";
import Success from "./components/Success";
import Toast from "./components/Toast";
import Signup from "./components/Signup";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./services/firebase";

const App = () => {
  const { showComp, success, phoneNumber } = useSelector((state) => state.otp);
  const [isVerified, setIsVerified] = useState(false);
  const [phoneNumberExists, setPhoneNumberExists] = useState(null);

  useEffect(() => {
    const checkPhoneNumberExists = async () => {
      if (phoneNumber) {
        const q = query(
          collection(db, "users"),
          where("phone", "==", phoneNumber)
        );
        const querySnapshot = await getDocs(q);
        setPhoneNumberExists(!querySnapshot.empty);
      }
    };

    if (isVerified) {
      checkPhoneNumberExists();
    }
  }, [phoneNumber, isVerified]);

  const handleVerification = () => {
    setIsVerified(true);
  };

  const handleSignupSuccess = () => {
    setPhoneNumberExists(true);
  };

  return (
    <div>
      <div>
        {showComp && !isVerified ? (
          <Login />
        ) : !showComp && !success ? (
          <Verify onClick={() => setIsVerified(true)} />
        ) : (
          phoneNumberExists ? <Success /> : <Signup onSuccess={handleSignupSuccess} />
        )}
      </div>

      <Toast />
    </div>
  );
};

export default App;
