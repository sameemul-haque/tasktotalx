import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Verify from "./components/Verify";
import Success from "./components/Success";
import Toast from "./components/Toast";
import Signup from "./components/Signup";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth} from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const { showComp, success, phoneNumber } = useSelector((state) => state.otp);
  const [isVerified, setIsVerified] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  console.log("Checking if phone number exists:", phoneNumber);

  useEffect(() => {
    const checkPhoneNumberExists = async () => {
      if (phoneNumber) {
        const q = query(collection(db, "users"), where("phone", "==", phoneNumber));
        const querySnapshot = await getDocs(q);
        console.log("Query snapshot:", querySnapshot.docs);
        setIsNewUser(querySnapshot.empty);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsVerified(true); 
        checkPhoneNumberExists();
      } else {
        setIsVerified(false);
      }
    });

    return () => unsubscribe();
  }, [phoneNumber]);

  const handleSignupSuccess = () => {
    setIsNewUser(false);
  };

  return (
    <div>
      <div>
        {showComp && !isVerified ? (
          <Login />
        ) : !showComp && !success ? (
          <Verify onClick={() => setIsVerified(true)} />
        ) : (
          isNewUser ? (
            <Signup onSuccess={handleSignupSuccess} />
          ) : (
            <Success />
          )
        )}
      </div>
      <Toast />
    </div>
  );
};

export default App;
