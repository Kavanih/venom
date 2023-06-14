import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import ConnectButton from "../venom-connect/connectbutton";
import Alert from "./Alert";
import { DataContext } from "../../Context/DataContext/DataContext";
import AlertContext from "../../Context/AlertContext/AlertContext";
import { claimFaucet } from "../../utils";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { provider, addr } = useContext(DataContext);
  const alertCon = useContext(AlertContext);
  const { addAlert } = alertCon;

  return (
    <nav className="flex justify-between items-center py-6 relative">
      <Alert />
      <div className="logo text-lg sm:text-4xl">
        <Link to="/">🕷 Vviper</Link>
      </div>
      <div className={`links ${showMenu ? "" : "nav_control"}`}>
        <button onClick={() => setShowMenu(false)}>
          <Link to={"/dice"}>Dice</Link>
        </button>

        <button onClick={() => setShowMenu(false)}>
          <Link to={"/RPS"}>RPS</Link>
        </button>

        <button onClick={() => setShowMenu(false)}>
          <Link to={"/coinflip"}>CoinFlip</Link>
        </button>

        {/* CLAIM BUTTON  */}
        <button onClick={() => claimFaucet(provider, addr, addAlert)}>
          <Link to={"/"}>Claim $Vviper</Link>
        </button>

        <ConnectButton />
      </div>
      <div className="open lg:hidden inline-block">
        <button onClick={() => setShowMenu(!showMenu)}>
          <BiMenuAltRight className="text-2xl" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
