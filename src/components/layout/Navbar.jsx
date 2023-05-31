import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-6">
      <div className="logo text-4xl">🕷 Neuro</div>
      <div className="links flex gap-3">
        <button>
          <Link to={"/dice"}>Dice</Link>
        </button>

        <button>
          <Link to={"/RPS"}>RPS</Link>
        </button>

        <button>
          <Link to={"/coinflip"}>CoinFlip</Link>
        </button>

        <button className="to_discord">
          <a href="" target="_blank">
            White paper
          </a>
        </button>

        <button className="connect">
          <Link to={"/connectwallet"}>Connect Wallet</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
