import React from "react";
import { Formik } from "formik";
import styles from "../assets/css/modules/Login.module.css";
import * as Yup from "yup";
import { loginApi } from "../api/users";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await loginApi(values).then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        toast.success("login successfull");
        navigate("/");
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
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
    password: Yup.string().required("password is required"),
  });
  return (
    <>
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
          <form onSubmit={handleSubmit}>
            <div className={styles.maincontainer}>
              <div className={styles.loginheading}>
                <h1>NAYARA</h1>
              </div>
              <input
                className={styles.logininput}
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email && (
                <div className="errormessage">
                  <p>{errors.email}</p>
                </div>
              )}

              <input
                className={styles.logininput}
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />

              {touched.password && errors.password && (
                <div className="errormessage">
                  <p>{errors.password}</p>
                </div>
              )}

              <button className={styles.loginbutton} type="submit">
                Login
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
