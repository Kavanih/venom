import { useState } from "react";
import { TbCircleLetterV } from "react-icons/tb";

const Currency = ({ cho1, cho2, side, setSide, ratee, setRate, bal }) => {
  const rates = {
    venom: [5, 10, 15, 20, 25],
    trithon: [50, 100, 150, 200, 250],
  };

  const [currRate, setCurrRate] = useState("venom");
  // const [ratee, setRate] = useState(rates[currRate][0]);

  return (
    <div className="left flex flex-col justify-center">
      <div className="rates ">
        {rates[currRate].map((rate, idx) => (
          <div
            className={`rate ${rate === ratee ? "selected" : ""}`}
            onClick={() => setRate(rates[currRate][idx])}
            key={idx}
          >
            {rate} {currRate === "venom" ? <TbCircleLetterV /> : "🕷"}
          </div>
        ))}
      </div>
      {/* NUMBER TYPE */}
      <div className="num_type sm:flex w-full mx-auto justify-between mb-20">
        {cho1 && (
          <div className="num">
            <div
              className={`even ${side === cho1 ? "selected" : ""}`}
              onClick={() => setSide(cho1)}
            >
              {cho1}
            </div>
            <div
              className={`even ${side === cho2 ? "selected" : ""}`}
              onClick={() => setSide(cho2)}
            >
              {cho2}
            </div>
          </div>
        )}
        {/* SELECT PART */}

        <select className="" onChange={(e) => setCurrRate(e.target.value)}>
          <option value="venom">
            $Viper &nbsp; &nbsp; &nbsp; &nbsp; 🕷 {parseInt(bal / 10 ** 18)}
          </option>
          <option value="trithon">Trithon</option>
        </select>
      </div>
      {/* RECENT */}
      <div className="recent hidden lg:block">
        <div className="top p-2 bg-color3">Recent Type</div>
        <div className="main_recent">Loading.....</div>
      </div>
    </div>
  );
};

export default Currency;
