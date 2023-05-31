import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import ConnectWallet from "./components/auth/ConnectWallet";
import Navbar from "./components/layout/Navbar";
import Dice from "./components/layout/Dice";
import RPS from "./components/layout/RPS";

function App() {
  return (
    <Router>
      <div className="App w-4/5 mx-auto">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/connectwallet" element={<ConnectWallet />} />
          <Route exact path="/dice" element={<Dice />} />
          <Route exact path="/RPS" element={<RPS />} />
          <Route exact path="/connectwallet" element={<ConnectWallet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
