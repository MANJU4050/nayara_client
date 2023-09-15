import React from "react";
import styles from "../assets/css/modules/Navbar.module.css";
import nayara from "../assets/images/nayara.jpg";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import download from "../assets/icons/download.svg";
import { getVehicles } from "../api/vehicles";
import jsPDF from "jspdf";

const Navbar = () => {
  

  const generatePDF = (vehicles) => {

    // Calculate the total number of pages required based on the number of vehicles

  const vehiclesPerPage = 21;
  // Calculate the total number of pages required based on the number of vehicles
  const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);
    // Create a new A4-sized PDF
    const doc = new jsPDF('p', 'mm', 'a4');

    // Loop through the pages
    for (let page = 0; page < totalPages; page++) {
      // Add a new page for each set of vehicles, except for the first page
      if (page > 0) {
        doc.addPage();
      }

      // Loop through the vehicles on the current page
      for (let i = page * vehiclesPerPage; i < (page + 1) * vehiclesPerPage && i < vehicles.length; i++) {
        const vehicle = vehicles[i];
        // Calculate the X and Y positions for each vehicle box
        const x = 6 + ((i - (page * vehiclesPerPage)) % 3) * 70; // 3 vehicles per row
        const y = 9 + Math.floor((i - (page * vehiclesPerPage)) / 3) * 40; // Adjust the vertical position

        const boxWidth = 60; // Box width
        const boxHeight = 30; // Box height

        // Draw a rectangular box for the vehicle
        doc.rect(x, y, boxWidth, boxHeight);

        // Reduce font size to fit text within the box
        doc.setFontSize(9);

        // Add text for vehicle details (name, mobile, vehicle, receipt) inside the box
        doc.text(`Name: ${vehicle.name}`, x + 2, y + 8);
        doc.text(`Mobile: ${vehicle.mobileNumber}`, x + 2, y + 14);
        doc.text(`Vehicle: ${vehicle.vehicleNumber}`, x + 2, y + 20);
        doc.text(`Receipt: ${vehicle.receiptNumber}`, x + 2, y + 26);
      }
    }

    // Save or download the single PDF file with multiple pages
    doc.save('vehicles.pdf');
  };
  const downloadPdf = async () => {
    await getVehicles().then((res) => {
      generatePDF(res.data?.vehicles);
    });
  };
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbarheading}>
          <img src={nayara} alt="nayara" className={styles.nayara} />
        </div>
        <div className={styles.navleft}>
          <button className={styles.download} onClick={downloadPdf}>
            <img
              src={download}
              alt="download"
              className={styles.downloadicon}
            />
          </button>
          <button className={styles.logoutbutton} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
