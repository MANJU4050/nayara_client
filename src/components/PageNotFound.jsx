import React from "react";
import styles from "../assets/css/modules/PageNotFound.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const PageNotFound = () => {
  return (
    <div className={styles.container}>
    <div className={styles.iconcontainer}> <FontAwesomeIcon icon={faTriangleExclamation}/></div>
    <div className={styles.message}>404</div>
      <div className={styles.message}>Page not found</div>
    </div>
  );
};

export default PageNotFound;
