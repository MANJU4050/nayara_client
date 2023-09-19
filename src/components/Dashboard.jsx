import React, { useEffect, useState } from "react";
import Table from "./Table";
import styles from "../assets/css/modules/Dashboard.module.css";
import { getVehicles } from "../api/vehicles";
import { Spinner } from "react-bootstrap";
import jsPDF from "jspdf";
import { deleteVehicle } from "../api/vehicles";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [today, setToday] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    const getAllVehicles = async () => {
      try {
        setIsLoad(true);
        await getVehicles().then((response) => {
          setToday(response.data?.vehiclesRegisteredToday);
          setTotal(response.data?.totalVehiclesRegistered);
          const sortedVehicles = response.data?.vehicles.sort(
            (a, b) =>
              new Date(b.registrationDate) - new Date(a.registrationDate)
          );
          setVehicles(sortedVehicles);
        });

        setIsLoad(false);
      } catch (error) {
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

  return (
    <>
      {isLoad ? (
        <div
          className="d-flex text-warning justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.detailcontainer}>
            <div className={styles.detailscontainer}>
              <div className={styles.detailsvalue}>{today}</div>
              <div className={styles.detailslabel}>Today</div>
            </div>
            <div className={styles.detailscontainer}>
              <div className={styles.detailsvalue}>{total}</div>
              <div className={styles.detailslabel}>Total</div>
            </div>
          </div>
          <Table
            deleteVehicleWithId={deleteVehicleWithId}
            vehicles={vehicles}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
