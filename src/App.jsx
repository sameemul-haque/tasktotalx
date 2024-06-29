import { useSelector } from "react-redux";
import { useState } from "react";
import Login from "./components/Login";
import Verify from "./components/Verify";
import Success from "./components/Success";
import Toast from "./components/Toast";
import Signup from "./components/Signup";

const App = () => {
  const { showComp, success } = useSelector((state) => state.otp);
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div>
      <div>
        {showComp && !isVerified ? (
          <Login />
        ) : !showComp && !success ? (
          <Verify onClick={() => setIsVerified(true)} />
        ) : (
          <Success />
        )}
      </div>

      <Toast />
    </div>
  );
};

export default App;
