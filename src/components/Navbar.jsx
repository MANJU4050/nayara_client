import React, { useEffect, useState } from "react";
import styles from "../assets/css/modules/Navbar.module.css";
import nayara from "../assets/images/nayara.jpg";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getVehicles } from "../api/vehicles";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import Bottom from "./Bottom";
import {
  faHome,
  faCar,
  faQrcode,
  faUsers,
  faFileArrowDown,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location?.pathname);
  const [toggle, setToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setActiveLink(location?.pathname);
  }, [location]);
  const generatePDF = (vehicles) => {
    // Calculate the total number of pages required based on the number of vehicles

    const vehiclesPerPage = 21;
    // Calculate the total number of pages required based on the number of vehicles
    const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);
    // Create a new A4-sized PDF
    const doc = new jsPDF("p", "mm", "a4");

    // Loop through the pages
    for (let page = 0; page < totalPages; page++) {
      // Add a new page for each set of vehicles, except for the first page
      if (page > 0) {
        doc.addPage();
      }

      // Loop through the vehicles on the current page
      for (
        let i = page * vehiclesPerPage;
        i < (page + 1) * vehiclesPerPage && i < vehicles.length;
        i++
      ) {
        const vehicle = vehicles[i];
        // Calculate the X and Y positions for each vehicle box
        const x = 6 + ((i - page * vehiclesPerPage) % 3) * 70; // 3 vehicles per row
        const y = 9 + Math.floor((i - page * vehiclesPerPage) / 3) * 40; // Adjust the vertical position

        const boxWidth = 60; // Box width
        const boxHeight = 30; // Box height

        // Draw a rectangular box for the vehicle
        doc.rect(x, y, boxWidth, boxHeight);

        // Reduce font size to fit text within the box
        doc.setFontSize(9);

        // Add text for vehicle details (name, mobile, vehicle, receipt) inside the box
        doc.text(`Name: ${vehicle.name}`, x + 2, y + 8);
        doc.text(`Mobile: ${vehicle.mobile}`, x + 2, y + 14);
        doc.text(`Vehicle: ${vehicle.vehicleNumber}`, x + 2, y + 20);
        doc.text(`Receipt: ${vehicle.receiptNumber}`, x + 2, y + 26);
      }
    }

    // Save or download the single PDF file with multiple pages
    doc.save("vehicles.pdf");
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
          {isMobile ? (
            <div
              onClick={() => {
                setToggle(!toggle);
              }}
              className={styles.menu}
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
          ) : (
            <>
              <button className={styles.download} onClick={downloadPdf}>
                <FontAwesomeIcon
                  className={styles.downloadicon}
                  icon={faFileArrowDown}
                />{" "}
                Download
              </button>
              <button className={styles.logoutbutton} onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      <div
        className={`${
          isMobile
            ? toggle
              ? styles.sidebar
              : styles.sidemenuhide
            : styles.sidebar
        }`}
      >
        <div
          className={`${styles.sidemenu} ${
            activeLink === "/" ? styles.activelink : ""
          }`}
          onClick={() => {
            navigate("/");
            setToggle(!toggle);
          }}
        >
          <FontAwesomeIcon className={styles.sidebaricon} icon={faHome} /> Home
        </div>
        <div
          className={`${styles.sidemenu} ${
            activeLink === "/vehicles" ? styles.activelink : ""
          }`}
          onClick={() => {
            navigate("/vehicles");
            setToggle(!toggle);
          }}
        >
          <FontAwesomeIcon className={styles.sidebaricon} icon={faCar} />
          Vehicles
        </div>
        
        <div
          className={`${styles.sidemenu} ${
            activeLink === "/agents" ? styles.activelink : ""
          }`}
          onClick={() => {
            navigate("/agents");
            setToggle(!toggle);
          }}
        >
          <FontAwesomeIcon className={styles.sidebaricon} icon={faUsers} />
          Agent
        </div>
        <div
          className={`${styles.sidemenu} ${
            activeLink === "/qr" ? styles.activelink : ""
          }`}
          onClick={() => {
            navigate("/qr");
            setToggle(!toggle);
          }}
        >
          <FontAwesomeIcon className={styles.sidebaricon} icon={faQrcode} />
          <div className={styles.menuname}>QrCode</div>
        </div>
        {isMobile ? (
          <>
            {" "}
            <div className={styles.sidemenu} onClick={downloadPdf}>
              <FontAwesomeIcon
                className={styles.sidebaricon}
                icon={faFileArrowDown}
              />
              Download
            </div>
            <div className={styles.sidemenu} onClick={logout}>
              <button className={styles.logoutbutton}>Logout</button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <Outlet />
      <Bottom />
    </>
  );
};

export default Navbar;
