import React from "react";
import styles from "../assets/css/modules/RegisterSuccess.module.css";
import nayara from "../assets/images/nayara.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const RegisterSuccess = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headingwraper}>
        <img src={nayara} alt="nayaralogo" className={styles.nayara} />

        <div className={styles.header}>NANMANDA FUELS MEGA PRIZE CONTEST</div>
      </div>
      <div className={styles.message}>
        <div className={styles.success}>
          Success
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
        <div className={styles.thankyou}>
          Thank you for participating in the contest.All the best
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
