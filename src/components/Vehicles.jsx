import React, { useState, useEffect } from "react";
import styles from "../assets/css/modules/Vehicles.module.css";
import Table from "./Table";
import { getVehicles } from "../api/vehicles";
import { deleteVehicle } from "../api/vehicles";
import { toast } from "react-toastify";
const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [reFetch,setReFetch] = useState(false)

  useEffect(() => {
    const getAllVehicles = async () => {
      try {
        await getVehicles().then((response) => {
          const sortedVehicles = response.data?.vehicles.sort(
            (a, b) =>
              new Date(b.registrationDate) - new Date(a.registrationDate)
          );
          setVehicles(sortedVehicles);
          console.log(response.data.vehicles);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getAllVehicles();
  }, [reFetch]);

  const deleteVehicleWithId = async(id)=>{
    try{
      
      await deleteVehicle(id).then((res)=>{
        toast.success("successfully deleted vehicle");
        setReFetch(!reFetch)
      })
    }catch(error){
      toast.error(error.response.data.error)
    }
  }

  return (
    <div className={styles.container}>
    <div className={styles.heading}>VEHICLES</div>
      <Table deleteVehicleWithId={deleteVehicleWithId} vehicles={vehicles} />
    </div>
  );
};

export default Vehicles;
