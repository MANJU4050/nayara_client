import React from "react";
import styles from "../assets/css/modules/Navbar.module.css";
import nayara from "../assets/images/nayara.jpg";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbarheading}>
          <img src={nayara} alt="nayara"  className={styles.nayara}/>
        </div>
        <div>
          <button className={styles.logoutbutton}>Logout</button>
        </div>
      </div>
      <Outlet/>
    </>
  );
};

export default Navbar;
