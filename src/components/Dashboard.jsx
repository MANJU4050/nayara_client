import React, { useEffect, useState } from "react";
import Table from "./Table";
import styles from "../assets/css/modules/Dashboard.module.css";
import { getVehicles } from "../api/vehicles";
import Bottom from "./Bottom";
import { Spinner } from "react-bootstrap";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [today, setToday] = useState("");
  const [total, setTotal] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const getAllVehicles = async () => {
      try {
        setIsLoad(true);
        const response = await getVehicles();
        setVehicles(response.data?.vehicles);
        setToday(response.data?.vehiclesRegisteredToday);
        setTotal(response.data?.totalVehiclesRegistered);
        console.log(response.data);
        setIsLoad(false);
      } catch (error) {
        console.log(error);
      }
    };

    getAllVehicles();
  }, []);

  return (
    <>
      {isLoad ? (
        <div
          className="d-flex text-warning justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" role="status">
          </Spinner>
        </div>
      ) : (
        <>
          {" "}
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
          <Table vehicles={vehicles} />
          <Bottom />
        </>
      )}
    </>
  );
};

export default Dashboard;
