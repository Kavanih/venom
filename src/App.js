import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import ConnectWallet from "./components/auth/ConnectWallet";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/connectwallet" element={<ConnectWallet />} />
          {/* <Route exact path="/" element={<Home/>}/> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
