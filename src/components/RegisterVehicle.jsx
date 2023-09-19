import React, { useState, useRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import styles from "../assets/css/modules/RegisterVehicle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { addVehicleApi } from "../api/vehicles";
import nayara from "../assets/images/nayara.jpg";
import {
  faUser,
  faCar,
  faMobileScreenButton,
  faFileShield,
} from "@fortawesome/free-solid-svg-icons";

const RegisterVehicle = () => {
  const navigate = useNavigate();
  const { agentId, agentName } = useParams();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const uniqueId1Ref = useRef(null);
  const uniqueId2Ref = useRef(null);
  const uniqueId3Ref = useRef(null);

  const handleUniqueIdChange = (e, nextInputRef, prevInputRef) => {
    if (e.target.value.length >= 4) {
      nextInputRef?.current?.focus();
    } else if (e.target.value.length === 0) {
      prevInputRef?.current?.focus();
    }
  };

  const initialValues = {
    name: "",
    mobile: "",
    vehicleNumber: "",
    agentId: agentId,
    agentName: agentName,
    uniqueId1: "",
    uniqueId2: "",
    uniqueId3: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Enter Valid mobile number")
      .required("Mobile number is required"),
    vehicleNumber: Yup.string().required("Vehicle number is required"),
    uniqueId1: Yup.string().required("coupon code required"),
    uniqueId2: Yup.string().required("coupon code required"),
    uniqueId3: Yup.string().required("coupon code required"),
  }).test("test-uniqueId", "Enter a valid coupon", function (values) {
    const { uniqueId1, uniqueId2, uniqueId3 } = values;

    // Your custom validation logic here
    // E.g., each unique ID must be exactly 4 characters long
    if (
      uniqueId1?.length === 4 &&
      uniqueId2?.length === 4 &&
      uniqueId3?.length === 4
    ) {
      return true;
    }

    return this.createError({
      path: "uniqueId1", // Or whichever you consider the main one
      message: "Enter a valid coupon",
    });
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setIsSubmiting(true);

      const uniqueId = `${values.uniqueId1}-${values.uniqueId2}-${values.uniqueId3}`;
      console.log(values.uniqueId);
      const { name, mobile, vehicleNumber, agentId, agentName } = values;
      await addVehicleApi({
        name,
        mobile,
        vehicleNumber,
        agentId,
        agentName,
        uniqueId,
      }).then(() => {
        resetForm();
        navigate("/success", { replace: true });
      });
      setIsSubmiting(false);
      setIsError(false);
      setError(null);
    } catch (error) {
      setIsSubmiting(false);
      setIsError(true);
      error?.response && error?.response?.data && setError(error.response.data);
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingwraper}>
        <img src={nayara} alt="nayaralogo" className={styles.nayara} />

        <div className={styles.header}>NANMANDA FUELS MEGA PRIZE CONTEST</div>
      </div>

      <div className={styles.formContainer}>
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
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.forminsidecontainer}>
                {isError && error ? (
                  <div className={styles.servererror}>{error}</div>
                ) : null}
                <div className={styles.inputcontainer}>
                  <FontAwesomeIcon className={styles.icon} icon={faUser} />
                  <input
                    className={styles.input}
                    type="text"
                    onChange={handleChange}
                    placeholder="Name"
                    onBlur={handleBlur}
                    id="name"
                    name="name"
                    value={values.name}
                    autoComplete="off"
                  />
                </div>

                {touched.name && errors.name && (
                  <div className={styles.error}>{errors.name}</div>
                )}

                <div className={styles.inputcontainer}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faMobileScreenButton}
                  />
                  <input
                    className={styles.input}
                    type="text"
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    onBlur={handleBlur}
                    id="mobile"
                    name="mobile"
                    value={values.mobile}
                    autoComplete="off"
                  />
                </div>
                {touched.mobile && errors.mobile && (
                  <div className={styles.error}>{errors.mobile}</div>
                )}

                <div className={styles.inputcontainer}>
                  <FontAwesomeIcon className={styles.icon} icon={faCar} />
                  <input
                    className={styles.input}
                    type="text"
                    onChange={handleChange}
                    placeholder="Vehicle Number"
                    onBlur={handleBlur}
                    id="vehicleNumber"
                    name="vehicleNumber"
                    value={values.vehicleNumber}
                    autoComplete="off"
                  />
                </div>
                {touched.vehicleNumber && errors.vehicleNumber && (
                  <div className={styles.error}>{errors.vehicleNumber}</div>
                )}

                <div className={styles.inputcontainer}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faFileShield}
                  />
                  <div className={styles.couponcontainer}>
                    <input
                      ref={uniqueId1Ref}
                      className={styles.inputcoupon}
                      onChange={(e) => {
                        handleChange(e);
                        handleUniqueIdChange(e, uniqueId2Ref, null);
                      }}
                      name="uniqueId1"
                      onBlur={handleBlur}
                      value={values.uniqueId1}
                      placeholder="xxxx"
                      autoComplete="off"
                      maxLength={4}
                    />
                    -
                    <input
                      ref={uniqueId2Ref}
                      className={styles.inputcoupon}
                      onChange={(e) => {
                        handleChange(e);
                        handleUniqueIdChange(e, uniqueId3Ref, uniqueId1Ref);
                      }}
                      name="uniqueId2"
                      onBlur={handleBlur}
                      value={values.uniqueId2}
                      placeholder="xxxx"
                      autoComplete="off"
                      maxLength={4}
                    />
                    -
                    <input
                      ref={uniqueId3Ref}
                      className={styles.inputcoupon}
                      onChange={(e) => {
                        handleChange(e);
                        handleUniqueIdChange(e, null, uniqueId2Ref);
                      }}
                      name="uniqueId3"
                      onBlur={handleBlur}
                      value={values.uniqueId3}
                      placeholder="xxxx"
                      autoComplete="off"
                      maxLength={4}
                    />
                  </div>
                </div>
                {touched.uniqueId1 &&
                touched.uniqueId2 &&
                touched.uniqueId3 &&
                errors.uniqueId1 ? (
                  <div className={styles.error}>{errors.uniqueId1}</div>
                ) : (
                  ""
                )}
                <div>
                  <button
                    className={styles.button}
                    type="submit"
                    disabled={isSubmiting}
                  >
                    {isSubmiting ? (
                      <div className={styles.registering}>
                        {" "}
                        Registering
                        <Spinner size="md" />{" "}
                      </div>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterVehicle;
