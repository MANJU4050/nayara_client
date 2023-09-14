import SharedComponent from "./components/SharedComponent";
import AddCandidate from "./components/AddCandidate";
import PickWinner from "./components/PickWinner";
import Winners from "./components/Winners";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Registration from "./components/Registration";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedComponent />} >
        <Route index element={<Home/>} />
        <Route path="addcandidate" element={<AddCandidate/>} />
        <Route path="pickwinner" element={<PickWinner />} />
        <Route path="winners" element={<Winners/>}/>
        </Route>
        <Route path="register" element={<Registration/>} />
      </Routes>
    </Router>
  );
}

export default App;
