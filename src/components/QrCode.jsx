import React, { useState, useEffect } from "react";
import styles from "../assets/css/modules/QrCode.module.css";
import { getAgents } from "../api/agents";
import QrCodeCard from "./QrCodeCard";
import { Spinner } from "react-bootstrap";

const QrCode = () => {
  const [agents, setAgents] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [inputText, setInputText] = useState(
    "https://nayaraprizecontest.netlify.app/register"
  );

  useEffect(() => {
    const getAgentsApi = async () => {
      try {
        setIsLoad(true);
        await getAgents().then((res) => {
          setAgents(res.data);
        });
        setIsLoad(false);
      } catch (error) {
        console.log(error);
      }
    };

    getAgentsApi();
  }, []);

  const qrCard =
    agents &&
    agents?.map((agent) => {
      return <QrCodeCard key={agent?.id} agent={agent} inputText={inputText} />;
    });

  return (
    <>
      {isLoad ? (
        <div
          className="d-flex text-warning justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.heading}>QrCode</div>
          <div className={styles.detailcontainer}>{qrCard}</div>
        </div>
      )}
    </>
  );
};

export default QrCode;
