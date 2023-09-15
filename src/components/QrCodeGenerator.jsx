import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import one from "../assets/images/oneblack.png";
import { getAgents } from "../api/agents/index";
function QRCodeGenerator() {
  const [agents, setAgents] = useState([]);
  const [inputText, setInputText] = useState(
    "https://nayaraprizecontest.netlify.app/register"
  );

  useEffect(() => {
    const getVehiclesApi = async () => {
      try {
        await getAgents().then((res) => {
          console.log(res.data);
          setAgents(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getVehiclesApi();
  }, []);

  return (
    <div>
      <h1>QR Code Generator</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          margin: "20px",
          padding: "50px",
          gap:"50px"
        }}
      >
        {agents?.map((agent)=>{
          return <QRCodeSVG
          value={`${inputText}/${agent?.name}/${agent?._id}`}
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
        })
          
        }
      </div>
    </div>
  );
}

export default QRCodeGenerator;
