import React from "react";
import styles from "../assets/css/modules/CouponTable.module.css";

const CouponTable = ({ coupons }) => {
  const couponList =
    coupons &&
    coupons?.map((coupon, index) => {
      return (
        <div key={coupon?._id + "-" + index}>
          <div className={styles.data}>
            <div className={`${styles.tabular} ${styles.date}`}>
              {index + 1}
            </div>
            <div className={styles.tabular}>{coupon?.uniqueId}</div>
            <div
              className={`${styles.tabular} ${
                coupon?.isUsed ? styles.used : styles.notused
              }`}
            >
              {" "}
              {coupon?.isUsed ? "used" : "not used"}
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
          <div className={styles.tabular}>Coupon Code</div>
          <div className={styles.tabular}>Used</div>
        </div>

        <div className={styles.body}>{couponList}</div>
      </div>
    </div>
  );
};

export default CouponTable;
