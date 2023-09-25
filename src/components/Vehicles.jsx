import React, { useState, useEffect } from "react";
import styles from "../assets/css/modules/Vehicles.module.css";
import Table from "./Table";
import { getVehicles } from "../api/vehicles";
import { deleteVehicle } from "../api/vehicles";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [reFetch, setReFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getAllVehicles = async () => {
      try {
        setIsLoading(true);
        await getVehicles().then((response) => {
          const sortedVehicles = response.data?.vehicles.sort(
            (a, b) =>
              new Date(b.registrationDate) - new Date(a.registrationDate)
          );
          setVehicles(sortedVehicles);
          setIsLoading(false);
          setIsError(false);
        });
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    };

    getAllVehicles();
  }, [reFetch]);

  const deleteVehicleWithId = async (id) => {
    try {
      await deleteVehicle(id).then((res) => {
        toast.success("successfully deleted vehicle");
        setReFetch(!reFetch);
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status" variant="warning"></Spinner>
      </div>
    );
  }

  if (vehicles?.length === 0) {
    return (
      <div className={styles.warningcontainer}>
        <div className={styles.warningmessage}>NO registrations found</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.errorcontainer}>
        <div className={styles.errormessage}>ERROR</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>VEHICLES</div>
      <Table deleteVehicleWithId={deleteVehicleWithId} vehicles={vehicles} />
    </div>
  );
};

export default Vehicles;
