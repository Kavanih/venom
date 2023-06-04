import { useContext, useState } from "react";
import Currency from "./Currency";
import Alert from "./Alert";
import AlertContext from "../../Context/AlertContext/AlertContext";

const Dice = () => {
  const [diceNumber, setDiceNumber] = useState(0);
  const [numType, setNumType] = useState("");
  const [status, setStatus] = useState("");

  const alertCon = useContext(AlertContext);
  const { addAlert } = alertCon;

  const startGame = () => {
    if (!numType) {
      addAlert("You haven't chosen your number type");
      return;
    }

    const rand = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(rand);

    const numm = rand % 2 === 0 ? "even" : "odd";
    if (numm === numType) {
      setStatus("You won");
    } else {
      setStatus("You lost");
    }
  };

  return (
    <div className="biggie">
      <Alert />
      {/* LEFT */}
      <Currency cho1="even" cho2="odd" side={numType} setSide={setNumType} />
      {/* RIGHT */}
      <div className="right flex flex-col justify-between">
        <div className="w-64 bg-color1 h-64 mx-auto flex justify-center items-center mb-4">
          {diceNumber ? (
            <img
              src={`/img/DICES/dice ${diceNumber}.svg`}
              alt=""
              className="w-4/5"
            />
          ) : (
            <img src="/img/DICES/dice rand1.svg" alt="" className="w-4/5" />
          )}
        </div>
        <div className="text-center">
          <button className="play_btn" onClick={startGame}>
            Roll Dice
          </button>
          <div className="status">{status}</div>
        </div>
      </div>
    </div>
  );
};

export default Dice;
