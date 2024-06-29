import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../services/firebase';
import signupimage from '../assets/signup-image.png';

const Signup = () => {
  // const phoneNumber = useSelector((state) => state.otp.phoneNumber);
  const phoneNumber = "7878787878";
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      phone: phoneNumber || '',
      terms: false,
    },
    validationSchema: Yup.object({
      fname: Yup.string().required('First name is required'),
      lname: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      terms: Yup.bool().oneOf([true], 'You must accept the terms and conditions'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          fname: values.fname,
          lname: values.lname,
          email: values.email,
          phone: values.phone,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
        setErrors({ submit: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="main-container">
      <div>
        <img src={signupimage} alt="signup" className="login-image" />
      </div>
      <div className="login-container">
        <h1>Signup</h1>
        <h5>Let’s get you all set up so you can access your personal account.</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="name-container">
            <div className="inputGroup firstName">
              <input
                type="text"
                id="fname"
                {...formik.getFieldProps('fname')}
                required
              />
              <label htmlFor="fname">First name</label>
              {formik.touched.fname && formik.errors.fname ? (
                <div className="error">{formik.errors.fname}</div>
              ) : null}
            </div>
            <div className="inputGroup lastName">
              <input
                type="text"
                id="lname"
                {...formik.getFieldProps('lname')}
                required
              />
              <label htmlFor="lname">Last name</label>
              {formik.touched.lname && formik.errors.lname ? (
                <div className="error">{formik.errors.lname}</div>
              ) : null}
            </div>
          </div>
          <div className="inputGroup">
            <input
              type="email"
              id="email"
              {...formik.getFieldProps('email')}
              required
            />
            <label htmlFor="email">Email</label>
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="tc-container">
            <input
              type="checkbox"
              id="terms-conditions"
              required
              {...formik.getFieldProps('terms')}
            />
            <label htmlFor="terms-conditions">
              I agree to all the <span className="red-text">Terms</span> and <span className="red-text">Privacy Policies</span>
            </label>
            {formik.touched.terms && formik.errors.terms ? (
              <div className="error">{formik.errors.terms}</div>
            ) : null}
          </div>
          <div className="phone-btn">
            <button type="submit" id="create-btn" disabled={formik.isSubmitting}>
              <span>Create Account</span>
            </button>
          </div>
          {formik.errors.submit && (
            <div className="error">{formik.errors.submit}</div>
          )}
        </form>
        <p className="already-have-an-account">
          Already have an account? <span className="red-text">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
