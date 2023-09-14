import React from "react";
import { Outlet } from "react-router-dom";
import Navigationbar from "./Navigationbar";

const SharedComponent = () => {
  return (
    <>
      <Navigationbar />
      <Outlet />
    </>
  );
};

export default SharedComponent;
