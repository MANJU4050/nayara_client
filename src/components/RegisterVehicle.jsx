import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import styles from "../assets/css/modules/RegisterVehicle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { addVehicleApi } from "../api/vehicles";
import nayara from "../assets/images/nayara.jpg";
import {
  faUser,
  faCar,
  faFile,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";

const RegisterVehicle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { agentId, agentName } = useParams();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const initialValues = {
    name: "",
    mobile: "",
    vehicleNumber: "",
    receiptNumber: "",
    agentId: agentId,
    agentName: agentName,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Enter Valid mobile number")
      .required("Mobile number is required"),
    vehicleNumber: Yup.string().required("Vehicle number is required"),
    receiptNumber: Yup.string().required("Receipt number is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setIsSubmiting(true);
      await addVehicleApi(values).then(() => {
        resetForm();
        navigate("/success", { replace: true });
      });
      setIsSubmiting(false);
    } catch (error) {
      setIsSubmiting(false);
      console.log(error.response.data.error);
      alert(error.response.data.error);
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
                  <FontAwesomeIcon className={styles.icon} icon={faFile} />
                  <input
                    className={styles.input}
                    type="text"
                    onChange={handleChange}
                    placeholder="Receipt Number"
                    onBlur={handleBlur}
                    id="receiptNumber"
                    name="receiptNumber"
                    value={values.receiptNumber}
                    autoComplete="off"
                  />
                </div>
                {touched.receiptNumber && errors.receiptNumber && (
                  <div className={styles.error}>{errors.receiptNumber}</div>
                )}

                <div>
                  <button
                    className={styles.button}
                    type="submit"
                    disabled={isSubmiting}
                  >
                    {isSubmiting ? <Spinner /> : "Register"}
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
