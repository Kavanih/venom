import { useState, useContext } from "react";
import Currency from "./Currency";
import AlertContext from "../../Context/AlertContext/AlertContext";
import Alert from "./Alert";

const CoinFlip = () => {
  const [trans, setTrans] = useState(0);
  const [side, setSide] = useState("");
  const [resultSide, setRsultSide] = useState("");

  const alertCon = useContext(AlertContext);
  const { addAlert } = alertCon;

  const setWinning = (rans) => {
    const compChoise = rans % 2 === 0 ? "head" : "tail";

    if (side === compChoise) {
      setRsultSide("You won");
    } else {
      setRsultSide("You lost");
    }
  };

  const startPlaying = () => {
    if (!side) {
      addAlert("You haven't chosen your side");
      return;
    }
    const randTrans = Math.floor(Math.random() * 10) + 4;
    setTrans(randTrans);
    setWinning(randTrans);
  };

  return (
    <div className="biggie">
      <Alert />
      {/* LEFT */}
      <Currency cho1="head" cho2="tail" side={side} setSide={setSide} />
      {/* RIGHT */}
      <div className="right ">
        <div
          className="coin_cont mb-6 lg:mb-0"
          style={{ transform: `rotateY(${trans * 180}deg)` }}
        >
          <img src="/img/heads.png" alt="" className="front_image transform" />
          <img src="/img/tails.png" alt="" className="back_image transform" />
        </div>
        <div className="text-center">
          <button className="play_btn" onClick={startPlaying}>
            Roll Dice
          </button>
          <div className="status">{resultSide}</div>
        </div>
        <div className="recent block lg:hidden mt-6">
          <div className="top p-2 bg-color3">Recent Type</div>
          <div className="main_recent">Loading.....</div>
        </div>
      </div>
    </div>
  );
};

export default CoinFlip;
