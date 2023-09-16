import React, { useState, useEffect, useRef } from "react";
import styles from "../assets/css/modules/QrCode.module.css";
import { getAgents } from "../api/agents";
import QrCodeCard from "./QrCodeCard";

const QrCode = () => {
  const [agents, setAgents] = useState([]);
  const [inputText, setInputText] = useState(
    "https://nayaraprizecontest.netlify.app/register"
  );

  useEffect(() => {
    const getAgentsApi = async () => {
      try {
        await getAgents().then((res) => {
          console.log(res.data);
          setAgents(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getAgentsApi();
  }, []);

  const qrCard = agents && agents?.map((agent) => {
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
