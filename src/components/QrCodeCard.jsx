import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import styles from "../assets/css/modules/QrCodeCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const QrCodeCard = ({ agent, inputText }) => {
  const componentRef = useRef(null);

  const handleDownload = () => {
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `qr-${agent?.name}.png`;
      link.href = imgData;
      link.click();
    });
  };

  return (
    <div ref={componentRef} className={styles.card}>
      <div key={agent?.id} className={styles.qrcontainer}>
        <QRCodeSVG
          className={styles.qr}
          value={`${inputText}/${agent?.name}/${agent?.number}/${agent?._id}`}
          size={384}
          fgColor={"#000000"}
          bgColor={"#ffffff"}
          level={"L"}
          includeMargin={false}
         
        />
        <div onClick={handleDownload} className={styles.namewraper}>
          <div  className={styles.agentname}>
            {agent?.name}
          </div>
          <FontAwesomeIcon className={styles.download} icon={faDownload} />
        </div>
      </div>
    </div>
  );
};

export default QrCodeCard;
