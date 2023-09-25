import React, { useEffect, useState } from "react";
import styles from "../assets/css/modules/Coupon.module.css";
import downloadCSV from "../utils/downloadCSV";
import { getCoupons } from "../api/coupons";
import { Spinner } from "react-bootstrap";
import CouponTable from "./CouponTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [couponDetails, setCouponDetails] = useState({
    totalCoupons: 0,
    usedCoupons: 0,
    remainingCoupons: 0,
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getCoupons(page);
      setPage((prev) => prev + 1);
      setCoupons([...coupons, ...res.data.coupons]);
      console.log(res.data);
      setCouponDetails(() => {
        return {
          totalCoupons: res.data?.totalCoupons,
          remainingCoupons: res.data?.remainingCoupons,
          usedCoupons: res.data?.totalUsedCoupons,
        };
      });
      setTotalPages(res.data.totalPages);
      setPage(page + 1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Infinite scrolling logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // User has scrolled to the bottom, fetch more coupons
        if (page <= totalPages && !isLoading) {
          fetchData();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [coupons, page, totalPages, isLoading]);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status" variant="warning"></Spinner>
      </div>
    );
  }

  if (coupons?.length === 0) {
    return (
      <div className={styles.warningcontainer}>
        <div className={styles.warningmessage}>No Coupons found</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.errorcontainer}>
        <div className={styles.errormessage}>ERROR</div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.heading}>COUPONS</div>
      <div className={styles.detailcontainer}>
        <div className={styles.detailscontainer}>
          <div className={styles.detailsvalue}>
            {couponDetails?.usedCoupons}
          </div>
          <div className={styles.detailslabel}>Used</div>
        </div>
        <div className={styles.detailscontainer}>
          <div className={styles.detailsvalue}>
            {couponDetails?.remainingCoupons}
          </div>
          <div className={styles.detailslabel}>Remaining</div>
        </div>
        <div className={styles.detailscontainer}>
          <div className={styles.detailsvalue}>
            {couponDetails?.totalCoupons}
          </div>
          <div className={styles.detailslabel}>Total</div>
        </div>
        <div
          className={`${styles.detailscontainer} ${styles.download}`}
          onClick={() => {
            coupons && downloadCSV(coupons);
          }}
        >
          <div className={styles.detailsvalue}>
            <FontAwesomeIcon icon={faArrowAltCircleDown} />
          </div>
          <div className={styles.detailslabel}>Download</div>
        </div>
      </div>
      <CouponTable coupons={coupons} />
    </div>
  );
};

export default Coupon;
