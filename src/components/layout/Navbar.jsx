import { useState } from "react";
import { Link } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex justify-between items-center py-6 relative">
      <div className="logo text-lg sm:text-4xl">🕷 Vviper</div>
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

        <button className="to_discord" onClick={() => setShowMenu(false)}>
          <a href="" target="_blank">
            White paper
          </a>
        </button>

        <button className="connect" onClick={() => setShowMenu(false)}>
          <Link to={"/connectwallet"}>Connect Wallet</Link>
        </button>
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
