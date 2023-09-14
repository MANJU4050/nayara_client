import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { addVehicleApi } from "../api/vehicles";

import "./styles/css/main.css";
import "./styles/css/util.css";
import "./styles/fonts/font-awesome-4.7.0/css/font-awesome.css";
import "../assets/css/Registration.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Enter Valid mobile number")
    .required("Mobile number is required"),
  vehicleNumber: Yup.string().required("Vehicle number is required"),
});

const Registration = () => {
  const initialValues = {
    name: "",
    mobile: "",
    vehicleNumber: "",
  };

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      const response = await addVehicleApi(values);
      console.log(response);
    } catch (error) {
      console.log(error.response.data.error);
      alert(error.response.data.error);
    }
  };

  return (
    <div className="limiter">
      <div
        className="container-login100"
        style={{
          
            background: "#09203f",
            background: "linear-gradient(to top, #09203f 0%, #537895 100%)"
        }}
      >
        <div className="wrap-login100">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
            }) => (
              <form
                className="login100-form validate-form"
                onSubmit={handleSubmit}
              >
                <span className="login100-form-title">Register</span>

                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    onChange={handleChange}
                    placeholder="Name"
                    onBlur={handleBlur}
                    id="name"
                    name="name"
                    value={values.name}
                  />

                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                </div>
                {touched.name && errors.name && (
                  <div className="errormessage">
                    <p>{errors.name}</p>
                  </div>
                )}

                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    onChange={handleChange}
                    placeholder="mobile"
                    onBlur={handleBlur}
                    id="mobile"
                    name="mobile"
                    value={values.mobile}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </span>
                </div>
                {touched.mobile && errors.mobile && (
                  <div className="errormessage">
                    <p>{errors.mobile}</p>
                  </div>
                )}

                <div className="wrap-input100 validate-input">
                  <input
                    className="input100"
                    type="text"
                    onChange={handleChange}
                    placeholder="Vehicle Number"
                    onBlur={handleBlur}
                    id="vehicleNumber"
                    name="vehicleNumber"
                    value={values.vehicleNumber}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-car" aria-hidden="true"></i>
                  </span>
                </div>
                {touched.vehicleNumber && errors.vehicleNumber && (
                  <div className="errormessage">
                    <p>{errors.vehicleNumber}</p>
                  </div>
                )}

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" type="submit">
                    Register
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Registration;
