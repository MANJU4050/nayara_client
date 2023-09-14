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
          backgroundColor:"white"
        }}
      >
        {inputText && (
          <QRCode
            value={inputText}
            size={384}
            
          />
        )}
      </div>
    </div>
  );
}

export default QRCodeGenerator;
