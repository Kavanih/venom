import { useState } from "react";
import { TbCircleLetterV } from "react-icons/tb";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

const RPS = () => {
  const rates = {
    venom: [5, 10, 15, 20, 25],
    trithon: [50, 100, 150, 200, 250],
  };

  const [myChoice, setMyChoice] = useState("");
  const [ourChoice, setOurChoice] = useState("");

  const choices = ["Rock", "Paper", "Scissors"];

  const [currRate, setCurrRate] = useState("venom");
  const [ratee, setRate] = useState(rates[currRate][0]);

  const choo = () => {
    if (myChoice === "Rock")
      return <FaHandRock className="text-[5rem] text-color1" />;
    else if (myChoice === "Paper")
      return <FaHandPaper className="text-[5rem] text-color1" />;
    if (myChoice === "Scissors")
      return <FaHandScissors className="text-[5rem] text-color1" />;
  };
  return (
    <div className="biggie grid grid-cols-2 h-[80vh] bg-color2 w-full rounded-lg p-10 gap-6">
      {/* LEFT */}
      <div className="left flex flex-col justify-center">
        <div className="rates grid grid-cols-5 gap-2 w-full bg-color1 mx-auto mb-6 rounded-sm p-1">
          {rates[currRate].map((rate, idx) => (
            <div
              className={`rate ${rate === ratee ? "selected" : ""}`}
              onClick={() => setRate(rates[currRate][idx])}
            >
              {rate} {currRate === "venom" ? <TbCircleLetterV /> : "🕷"}
            </div>
          ))}
        </div>
        {/* NUMBER TYPE */}
        <div className="num_type flex w-full mx-auto justify-between mb-20">
          {/* SELECT PART */}
          <select
            className="bg-color1 rounded-sm w-3/6 px-2 py-2"
            onChange={(e) => setCurrRate(e.target.value)}
          >
            <option value="venom">Venom</option>
            <option value="trithon">Trithon</option>
          </select>
        </div>
        {/* RECENT */}
        <div className="recent w-full mx-auto text-center rounded-lg overflow-hidden">
          <div className="top p-2 bg-color3">Recent Type</div>
          <div className="main_recent bg-color1 p-2">Loading.....</div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="right flex flex-col justify-between">
        {/* CHOICE */}
        <div className="num grid grid-cols-3 gap-1 bg-color1 rounded-lg overflow-hidden p-1 w-4/5 mx-auto">
          {choices.map((cha) => (
            <div
              className={`uppercase w-full py-1 text-center rounded-sm ${
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
        <div className="two_pic flex justify-between">
          <div className="pic1 w-2/5 flex justify-center items-center h-72 border-2 rounded-xl border-color1">
            {myChoice ? (
              choo()
            ) : (
              <div className="text-[5rem] text-color1">🕷</div>
            )}
          </div>
          <div className="pic1 w-2/5 flex justify-center items-center h-72 border-2 rounded-xl border-color1">
            {ourChoice ? (
              <FaHandRock className="text-[5rem] text-color1" />
            ) : (
              <div className="text-[5rem] text-color1">🕷</div>
            )}
          </div>
        </div>
        <div className="text-center">
          <button className="roll bg-color3 font-semibold py-2 px-8 rounded-md mx-auto">
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default RPS;
