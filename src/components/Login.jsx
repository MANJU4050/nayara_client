import React, { useState } from "react";
import { Formik } from "formik";
import styles from "../assets/css/modules/Login.module.css";
import * as Yup from "yup";
import { loginApi } from "../api/users";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
const Login = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmit(true);
    try {
      const res = await loginApi(values);
      localStorage.setItem("token", res.data?.token); // Not recommended for production; use HttpOnly cookies
      setIsSubmit(false);

      setIsSuccess(true);
      navigate("/");
      resetForm();
      setIsError(false);

      // Maybe set a success state and display a message?
    } catch (error) {
      setIsSubmit(false);
      setIsError(true);
      const errorMessage =
        error.response?.data?.error || "An unknown error occurred";
      setError(errorMessage);
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("enter valid email")
      .required("email is required"),
    password: Yup.string()
      .required("password is required")
      .min(8, "password should be atleast 8 characters")
      .max(15, "maximum 15 characters"),
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.formcontainer}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
          >
            {({
              values,
              handleSubmit,
              handleBlur,
              handleChange,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.forminsidecontainer}>
                  {isError && error && (
                    <div className={styles.servererror}>{error}</div>
                  )}

                  <div className={styles.header}>NAYARA</div>

                  <div className={styles.inputcontainer}>
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      autoComplete="off"
                    />
                    {touched.email && errors.email && (
                      <div className={styles.error}>{errors.email}</div>
                    )}

                    <input
                      className={styles.input}
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      autoComplete="off"
                    />

                    {touched.password && errors.password && (
                      <div className={styles.error}>{errors.password}</div>
                    )}
                  </div>

                  <button
                    className={styles.button}
                    type="submit"
                    disabled={isSubmit}
                  >
                    {isSubmit ? (
                      <Spinner />
                    ) : isSuccess ? (
                      <FontAwesomeIcon icon={faCircleCheck} />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
