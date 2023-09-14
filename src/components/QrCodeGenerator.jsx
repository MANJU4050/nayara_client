import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import one from "../assets/images/oneblack.png";

function QRCodeGenerator() {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <input
      style={{width:"500px"}}
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
          backgroundColor: "white",
        }}
      >
        {inputText && (
          <QRCodeSVG
            value={inputText}
            size={384}
            fgColor={"#000000"}
            bgColor={"#ffffff"}
            level={"L"}
            includeMargin={false}
            imageSettings={{
              src: one,
              x: undefined,
              y: undefined,
              height: 72,
              width: 72,
              excavate: true,
            }}
          />
        )}
      </div>
      <img src={one} alt="one" />
    </div>
  );
}

export default QRCodeGenerator;
