import React from "react";
import styles from "../assets/css/modules/Table.module.css";

const Table = ({ vehicles }) => {
  let count = 0;
  const vehicleList = vehicles?.map((vehicle) => {
    count++;

    const dateObject = new Date(vehicle?.registrationDate);

    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = String(dateObject.getFullYear()).slice(-2);

    const localDate = `${day}-${month}-${year}`;

    const localTime = dateObject.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <div className={styles.data} key={vehicle?._id}>
        <div className={`${styles.tabular} ${styles.date}`}>{count}</div>
        <div className={styles.tabular}>{vehicle?.name}</div>
        <div className={styles.tabular}>{vehicle?.mobile}</div>
        <div className={styles.tabular}>{vehicle?.vehicleNumber}</div>
        <div className={styles.tabular}>{vehicle?.receiptNumber}</div>
        <div className={`${styles.tabular} ${styles.date}`}>{localDate}</div>
        <div className={`${styles.tabular} ${styles.date}`}>{localTime}</div>
      </div>
    );
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={`${styles.tabular} ${styles.date}`}>SLno</div>
          <div className={styles.tabular}>Name</div>
          <div className={styles.tabular}>Mobile</div>
          <div className={styles.tabular}> Vehicle</div>
          <div className={styles.tabular}>Receipt No</div>
          <div className={`${styles.tabular} ${styles.date}`}>Date</div>
          <div className={`${styles.tabular} ${styles.date}`}>Time</div>
        </div>
        <div className={styles.body}>{vehicleList}</div>
      </div>
    </>
  );
};

export default Table;
