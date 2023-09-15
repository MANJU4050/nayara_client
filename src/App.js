import SharedComponent from "./components/SharedComponent";
import AddCandidate from "./components/AddCandidate";
import PickWinner from "./components/PickWinner";
import Winners from "./components/Winners";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import QrCodeGenerator from "./components/QrCodeGenerator";
import Navbar from "./components/Navbar";
import CouponGenerator from "./components/CouponGenerator";
import Error from "./components/Error";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

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
          </Route>
          <Route
            path="register/:agentName/:agentId"
            element={<Registration />}
          />
          <Route path="login" element={<Login />} />
          <Route path="qr" element={<QrCodeGenerator />} />
          <Route path="coupon" element={<CouponGenerator />} />
          <Route path="*" element={<Error />} />{" "}
        </Routes>
      </Router>
    </>
  );
}

export default App;
