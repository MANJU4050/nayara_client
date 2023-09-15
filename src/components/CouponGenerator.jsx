import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { getVehicles } from "../api/vehicles";

const CouponGenerator = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const getAllVehicles = async () => {
      try {
        await getVehicles().then((response) => {
          const sortedVehicles = response.data?.vehicles.sort(
            (a, b) =>
              new Date(b.registrationDate) - new Date(a.registrationDate)
          );
          setCoupons(sortedVehicles);
          console.log(sortedVehicles);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getAllVehicles();
  }, []);
  const couponsPerPage = 8; // Set the number of coupons per page
  const totalPages = Math.ceil(coupons.length / couponsPerPage);

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4"); // Create a new A4-sized PDF

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        doc.addPage(); // Add a new page for each set of coupons
      }

      for (
        let i = page * couponsPerPage;
        i < (page + 1) * couponsPerPage && i < coupons.length;
        i++
      ) {
        const coupon = coupons[i];
        const x = 10 + ((i - page * couponsPerPage) % 2) * 105; // Alternate between left and right columns
        const y = 15 + Math.floor((i - page * couponsPerPage) / 2) * 60; // Adjust the vertical position

        const width = 90; // Box width
        const height = 50; // Box height

        doc.rect(x, y, width, height);
        doc.text(`Name: ${coupon.name}`, x + 5, y + 10);
        doc.text(`Mobile: ${coupon.mobile}`, x + 5, y + 20);
        doc.text(`Vehicle: ${coupon.vehicleNumber}`, x + 5, y + 30);
        doc.text(`Receipt: ${coupon.receiptNumber}`, x + 5, y + 40);
      }
    }

    doc.save("coupons.pdf"); // Save or download the single PDF file with multiple pages
  };
  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default CouponGenerator;
