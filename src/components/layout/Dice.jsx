import { useState } from "react";
import { TbCircleLetterV } from "react-icons/tb";
import { BsFillDice6Fill } from "react-icons/bs";

const Dice = () => {
  const rates = {
    venom: [5, 10, 15, 20, 25],
    trithon: [50, 100, 150, 200, 250],
  };

  const [choice, setChoice] = useState("tail");
  const [currRate, setCurrRate] = useState("venom");
  const [ratee, setRate] = useState(rates[currRate][0]);

  return (
    <div className="biggie grid grid-cols-2 h-[80vh] bg-color2 w-full rounded-lg p-20">
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
          <div className="num flex gap-1 bg-color1 rounded-sm overflow-hidden p-1 w-2/5">
            <div
              className={`even ${choice === "head" ? "selected" : ""}`}
              onClick={() => setChoice("head")}
            >
              head
            </div>
            <div
              className={`even uppercase w-1/2 py-1 text-center rounded-sm cursor-pointer ${
                choice === "tail" ? "selected" : ""
              }`}
              onClick={() => setChoice("tail")}
            >
              tail
            </div>
          </div>
          {/* SELECT PART */}
          <select
            className="bg-color1 rounded-sm w-3/6 px-2"
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
        <div className="w-72 bg-color1 h-72 mx-auto flex justify-center items-center">
          <BsFillDice6Fill className="text-[8rem]" />
        </div>
        <div className="text-center">
          <button className="roll bg-color3 font-semibold py-2 px-8 rounded-md mx-auto">
            Roll Dice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dice;
