import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBljLgDBnN41H9HAZmIrm8zKXDe2u-Lvh0",
  authDomain: "taskforjobapplication.firebaseapp.com",
  projectId: "taskforjobapplication",
  storageBucket: "taskforjobapplication.appspot.com",
  messagingSenderId: "275026200524",
  appId: "1:275026200524:web:6f39a8ddf960c89b707f69",
  measurementId: "G-GZ21SWTQFS"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
