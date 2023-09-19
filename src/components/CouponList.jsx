import React, { useState, useEffect } from "react";
import axios from "axios";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:4000/api/users/get-coupons?page=${page}&limit=50`
      );
      setCoupons([...coupons, ...res.data.coupons]);
      setTotalPages(res.data.totalPages);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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
        if (page <= totalPages && !loading) {
          fetchData();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [coupons, page, totalPages, loading]);

  return (
    <div>
      <h1>Coupons</h1>
      <div>{coupons.length}</div>
      <ul>
        {coupons.map((coupon, index) => (
          <li key={index}>{coupon?.uniqueId}</li> // Replace 'code' with an actual property name from your coupon object
        ))}
      </ul>

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CouponList;
