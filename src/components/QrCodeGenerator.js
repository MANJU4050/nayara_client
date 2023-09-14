import React, { useState } from "react";
import QRCode from "qrcode.react";

function QRCodeGenerator() {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text"
        value={inputText}
        onChange={handleInputChange}
      />
      <div
        style={{
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {inputText && (
          <QRCode
            value={inputText}
            size={384}
            bgColor={"#1cceb1"}
            fgColor={"#652dcd"}
          />
        )}
      </div>
    </div>
  );
}

export default QRCodeGenerator;
