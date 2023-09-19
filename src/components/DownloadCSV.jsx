import React, { useState, useEffect } from "react";
import { getCoupons } from "../api/coupons";
const DownloadCSV = () => {
  const [data, setData] = useState([]);

  // Fetch data from API
  useEffect(() => {
    // Replace this with your actual API call
    const fetchData = async () => {
      try {
        await getCoupons().then((res) => {
          setData(res?.data?.coupons);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Create CSV Blob in chunks
  const createCSVBlob = (data) => {
    const header =
      "uniqueId1,uniqueId2,uniqueId3,uniqueId4,uniqueId5,uniqueId6,uniqueId7,uniqueId8,uniqueId9,uniqueId10\n";
    const blobParts = [header];

    for (let i = 0; i < data.length; i += 10) {
      const row =
        data
          .slice(i, i + 10)
          .map((item) => item.uniqueId)
          .join(",") + "\n";
      blobParts.push(row);
    }

    return new Blob(blobParts, { type: "text/csv" });
  };

  // Download CSV
  const downloadCSV = () => {
    const blob = createCSVBlob(data);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "uniqueIds.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <button onClick={downloadCSV}>Download CSV</button>
    </div>
  );
};

export default DownloadCSV;
