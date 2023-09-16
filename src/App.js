import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import Agent from "./components/Agent";
import Vehicles from "./components/Vehicles";
import QrCode from "./components/QrCode";
import RegisterVehicle from "./components/RegisterVehicle";
import RegisterSuccess from "./components/RegisterSuccess";

function App() {
  return (
    <>
      {" "}
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="vehicles"
              element={
                <ProtectedRoute>
                  <Vehicles />
                </ProtectedRoute>
              }
            />

            <Route
              path="agents"
              element={
                <ProtectedRoute>
                  <Agent />
                </ProtectedRoute>
              }
            />
            <Route
              path="qr"
              element={
                <ProtectedRoute>
                  <QrCode />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route
            path="/registration/:agentName/:number/:agentId"
            element={<RegisterVehicle />}
          />
          <Route path="/success" element={<RegisterSuccess />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
