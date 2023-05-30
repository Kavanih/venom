import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <div className="logo">🕷</div>
      <div className="links">
        <button className="connect">
          <Link to={"/connectwallet"}>Connect Wallet</Link>
        </button>
        <button className="to_discord">
          <a href="" target="_blank">
            Discord
          </a>
        </button>

        <button className="to_discord">
          <a href="" target="_blank">
            Twitter
          </a>
        </button>

        <button className="to_discord">
          <a href="" target="_blank">
            White paper
          </a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
