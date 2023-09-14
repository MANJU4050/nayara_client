import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getVehicles } from "../api/vehicles";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../assets/css/Table.css";

const DataTable = () => {
  // const exportPDF = () => {
  //   const input = document.getElementById('my-table');
  //   const pdf = new jsPDF('p', 'mm', 'a4'); // A4-size page of PDF
  //   const pageWidth = pdf.internal.pageSize.getWidth();
  //   const pageHeight = pdf.internal.pageSize.getHeight();

  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');

  //     const imgWidth = (canvas.width * 75) / 300; // original width converted to mm
  //     const imgHeight = (canvas.height * 75) / 300; // original height converted to mm

  //     // Calculate ratios for scaling
  //     const widthRatio = pageWidth / imgWidth;
  //     const heightRatio = pageHeight / imgHeight;

  //     // Use the smallest ratio that the image fits into
  //     const ratio = Math.min(widthRatio, heightRatio);

  //     console.log(ratio,"ratio")

  //     const scaledWidth = imgWidth * ratio;
  //     const scaledHeight = imgHeight * ratio;

  //     console.log(scaledWidth,"width");
  //     console.log(scaledHeight,"height")

  //     // Calculate horizontal and vertical offsets to center the table on the page
  //     const xOffset = (pageWidth - scaledWidth) / 2;
  //     const yOffset = (pageHeight - scaledHeight) / 2;

  //     pdf.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);
  //     pdf.save("download.pdf");
  //   });
  // };

  const [vehicles, setVehicles] = useState([]);
  const [today, setToday] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    const getAllVehicles = async () => {
      try {
        const response = await getVehicles();
        setVehicles(response.data?.vehicles);
        setToday(response.data?.vehiclesRegisteredToday);
        setTotal(response.data?.totalVehiclesRegistered);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllVehicles();
  }, []);

  const vehicleList = vehicles?.map((vehicle) => {
    const dateObject = new Date(vehicle?.registrationDate);

    // Extract individual date components
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = String(dateObject.getFullYear()).slice(-2); // Get the last 2 digits of the year

    // Format the date in "dd-mm-yy" format
    const localDate = `${day}-${month}-${year}`;

    // Format the time in "HH:mm am/pm" format
    const localTime = dateObject.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour time format with AM/PM
    });
    return (
      <tr key={vehicle?._id}>
        <td>{vehicle?.name}</td>
        <td>{vehicle?.mobile}</td>
        <td>{vehicle?.vehicleNumber}</td>
        <td>{localDate}</td>
        <td>{localTime}</td>
      </tr>
    );
  });

  return (
    <>
      <div style={{width:"100%",display:"flex",justifyContent:"center",gap:"200px",backgroundColor:"black",height:"100px",alignItems:"center"}}>
        <div style={{color:"white",fontSize:"4rem"}}>{today}</div>
        <div style={{color:"white",fontSize:"4rem"}}>{total}</div>
      </div>
      <div className="table-wrapper">
        <table className="beautiful-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Vehicle Number</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{vehicleList}</tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
