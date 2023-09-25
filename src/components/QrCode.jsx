import React, { useState, useEffect } from "react";
import styles from "../assets/css/modules/QrCode.module.css";
import { getAgents } from "../api/agents";
import QrCodeCard from "./QrCodeCard";
import { Spinner } from "react-bootstrap";

const QrCode = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inputText, setInputText] = useState(
    "https://nayaraprizecontest.netlify.app"
  );

  useEffect(() => {
    const getAgentsApi = async () => {
      try {
        setIsLoading(true);
        await getAgents().then((res) => {
          setAgents(res.data);
        });
        setIsError(false);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    };

    getAgentsApi();
  }, []);

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

  if (agents?.length === 0) {
    return (
      <div className={styles.warningcontainer}>
        <div className={styles.warningmessage}>NO registrations found</div>
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

  const qrCard =
    agents &&
    agents?.map((agent) => {
      return <QrCodeCard key={agent?.id} agent={agent} inputText={inputText} />;
    });

  return (
    <div className={styles.container}>
      <div className={styles.heading}>QrCode</div>
      <div className={styles.detailcontainer}>{qrCard}</div>
    </div>
  );
};

export default QrCode;
