import React, { useState } from "react";
import styles from "../assets/css/modules/Table.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";

const Table = ({ vehicles, deleteVehicleWithId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  let count = 0;
  const vehicleList =
    vehicles &&
    vehicles?.map((vehicle) => {
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
        <div key={vehicle?._id}>
          <div className={styles.data}>
            <div className={`${styles.tabular} ${styles.date}`}>{count}</div>
            <div className={styles.tabular}>{vehicle?.name}</div>
            <div className={styles.tabular}>{vehicle?.mobile}</div>
            <div className={styles.tabular}>{vehicle?.vehicleNumber}</div>
            <div className={`${styles.tabular} ${styles.date}`}>
              {vehicle?.receiptNumber}
            </div>
            <div className={`${styles.tabular} ${styles.date}`}>
              {localDate}
            </div>
            <div className={`${styles.tabular} ${styles.date}`}>
              {localTime}
            </div>
            <div
              onClick={() => {
                deleteVehicleWithId(vehicle?._id);
              }}
              className={`${styles.tabular} `}
            >
              <div className={styles.delete}>
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          </div>
        </div>
      );
    });
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <div className={styles.heading}>
          <div className={`${styles.tabular} ${styles.date}`}>SLno</div>
          <div className={styles.tabular}>Name</div>
          <div className={styles.tabular}>Mobile</div>
          <div className={styles.tabular}> Vehicle</div>
          <div className={`${styles.tabular} ${styles.date}`}>Receipt No</div>
          <div className={`${styles.tabular} ${styles.date}`}>Date</div>
          <div className={`${styles.tabular} ${styles.date}`}>Time</div>
          <div className={`${styles.tabular}`}>Delete</div>
        </div>

        <div className={styles.body}>{vehicleList}</div>
      </div>
    </div>
  );
};

export default Table;
