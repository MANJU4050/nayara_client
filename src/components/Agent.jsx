import React, { useEffect, useState } from "react";
import { addAgent, getAgents } from "../api/agents";
import styles from "../assets/css/modules/Agent.module.css";
import { Spinner } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
const Agent = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [reload, setReload] = useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    number: "",
  });
  useEffect(() => {
    const getVehiclesApi = async () => {
      try {
        setIsLoading(true);
        await getAgents().then((res) => {
          console.log(res.data);
          setAgents(res.data);
          setInitialValues((prev) => {
            return { ...prev, number: res.data?.length + 1 };
          });
        });
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
    };

    getVehiclesApi();
  }, [reload]);

  const handleSubmit = async (values) => {
    try {
      values.number = values?.number.toString()
      setIsSubmitting(true);
      await addAgent(values).then((res) => {
        toast.success("agent added succesfully");
        setReload(!reload);
      });
      setIsSubmitting(false);
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .max(15, "max characters is 15")
      .min(3, "atleast 3 characters are required"),
  });

  const agentList =
    agents &&
    agents?.map((agent) => {
      return (
        <div key={agent?.id} className={styles.card}>
          <div className={styles.count}>{agent?.vehicleCount}</div>
          <div className={styles.name}>{agent?.name}</div>
        </div>
      );
    });

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" role="status" variant="warning"></Spinner>
        </div>
      ) : (
        <>
          <div className={styles.heading}>AGENTS<div
          style={{
            color: "black",
            width: "40px",
            height: "40px",
            backgroundColor: "white",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft:"5px"
          }}
        >
          {initialValues?.number-1}
        </div></div>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              errors,
              touched,
              handleBlur,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={styles.addcontainer}>
                  <div className={styles.add}>
                    
                    <input
                      className={styles.addinput}
                      type="text"
                      placeholder="Agent Name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <button className={styles.addbutton}>Register</button>
                  </div>
                  {touched.name && errors.name && (
                    <div className={styles.error}>{errors?.name}</div>
                  )}
                </div>
              </form>
            )}
          </Formik>

          <div className={styles.detailcontainer}>{agentList}</div>
        </>
      )}
    </div>
  );
};

export default Agent;
