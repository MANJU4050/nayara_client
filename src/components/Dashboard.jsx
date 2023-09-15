import React, { useEffect, useState } from "react";
import Table from "./Table";
import styles from "../assets/css/modules/Dashboard.module.css";
import { getVehicles } from "../api/vehicles";
import Bottom from "./Bottom";
import { Spinner } from "react-bootstrap";
import jsPDF from "jspdf";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [today, setToday] = useState("");
  const [total, setTotal] = useState("");
  const [isLoad, setIsLoad] = useState(false);

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
          console.log(response.data);
        });

        setIsLoad(false);
      } catch (error) {
        console.log(error);
      }
    };

    getAllVehicles();
  }, []);

  const vehiclesPerPage = 8; // Set the number of vehicles per page
  const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4"); // Create a new A4-sized PDF

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        doc.addPage(); // Add a new page for each set of vehicles
      }

      for (
        let i = page * vehiclesPerPage;
        i < (page + 1) * vehiclesPerPage && i < vehicles.length;
        i++
      ) {
        const vehicle = vehicles[i];
        const x = 10 + ((i - page * vehiclesPerPage) % 2) * 105; // Alternate between left and right columns
        const y = 15 + Math.floor((i - page * vehiclesPerPage) / 2) * 60; // Adjust the vertical position

        const width = 90; // Box width
        const height = 50; // Box height

        doc.rect(x, y, width, height);
        doc.text(`Name: ${vehicle.name}`, x + 5, y + 10);
        doc.text(`Mobile: ${vehicle.mobile}`, x + 5, y + 20);
        doc.text(`Vehicle: ${vehicle.vehicleNumber}`, x + 5, y + 30);
        doc.text(`Receipt: ${vehicle.receiptNumber}`, x + 5, y + 40);
      }
    }

    doc.save("vehicles.pdf"); // Save or download the single PDF file with multiple pages
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
        <>
          {" "}
          <div className={styles.detailcontainer}>
            <div className={styles.detailscontainer}>
              <div className={styles.detailsvalue}>{today}</div>
              <div className={styles.detailslabel}>Today</div>
            </div>
            <div className={styles.detailscontainer}>
              <div onClick={generatePDF} className={`${styles.detailsvalue} ${styles.download}`}>{total}</div>
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
