import { useContext, useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import Currency from "./Currency";
import Alert from "./Alert";
import AlertContext from "../../Context/AlertContext/AlertContext";

const RPS = () => {
  const [myChoice, setMyChoice] = useState(null);
  const [ourChoice, setOurChoice] = useState(null);
  const [status, setStatus] = useState("");

  const alertCon = useContext(AlertContext);
  const { addAlert } = alertCon;

  const choices = ["Rock", "Paper", "Scissors"];

  const chooses = {
    Rock: {
      win: "Scissors",
      lose: "Paper",
    },
    Scissors: {
      win: "Paper",
      lose: "Rock",
    },
    Paper: {
      win: "Rock",
      lose: "Scissors",
    },
  };

  const choo = (choice) => {
    if (choice === "Rock") return <FaHandRock className="choice" />;
    else if (choice === "Paper") return <FaHandPaper className="choice" />;
    if (choice === "Scissors") return <FaHandScissors className="choice" />;
  };

  const generateComp = () => {
    const randChoice = choices[Math.floor(Math.random() * 3)];
    setOurChoice(randChoice);
    pickWinner(randChoice);
  };

  const pickWinner = (rand) => {
    if (rand === chooses[myChoice].win) {
      setStatus("You won");
    } else if (rand === chooses[myChoice].lose) {
      setStatus("You Lost");
    } else {
      setStatus("It is a draw");
    }
  };

  const startPlaying = () => {
    if (!myChoice) {
      addAlert("You haven't selected your choice");
      return;
    }
    generateComp();
  };

  return (
    <div className="biggie">
      <Alert />
      {/* LEFT */}
      <Currency />
      {/* RIGHT */}
      <div className="right flex flex-col justify-between px-6">
        {/* CHOICE */}
        <div className="user_choice">
          {choices.map((cha) => (
            <div
              className={`uppercase w-full py-1 text-center rounded-sm cursor-pointer ${
                cha === myChoice ? "selected" : ""
              }`}
              onClick={() => setMyChoice(cha)}
              key={cha}
            >
              {cha}
            </div>
          ))}
        </div>
        {/* CHOICES */}
        <div className="two_pic flex justify-between my-6">
          <div className="pic1">
            {myChoice ? choo(myChoice) : <div className="choice">🕷</div>}
          </div>
          <div className="pic1">
            {ourChoice ? choo(ourChoice) : <div className="choice">🕷</div>}
          </div>
        </div>
        <div className="text-center">
          <button className="play_btn" onClick={startPlaying}>
            Play
          </button>
          <div className="status">{status}</div>
        </div>
        <div className="recent block lg:hidden mt-6">
          <div className="top p-2 bg-color3">Recent Type</div>
          <div className="main_recent">Loading.....</div>
        </div>
      </div>
    </div>
  );
};

export default RPS;
