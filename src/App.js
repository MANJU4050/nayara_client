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
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="register" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="qr" element={<QrCodeGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
