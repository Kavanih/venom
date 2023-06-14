import { useState, useContext } from "react";
import { TbCircleLetterV } from "react-icons/tb";
import { DataContext } from "../../Context/DataContext/DataContext";

const Currency = ({
  cho1,
  cho2,
  side,
  setSide,
  ratee,
  setRate,

  recentGames,
}) => {
  const rates = {
    viper: [5, 10, 15, 20, 25],
  };

  const [currRate, setCurrRate] = useState("viper");
  const { balance } = useContext(DataContext);

  return (
    <div className="left flex flex-col justify-center">
      <div className="rates ">
        {rates[currRate].map((rate, idx) => (
          <div
            className={`rate ${rate === ratee ? "selected" : ""}`}
            onClick={() => setRate(rates[currRate][idx])}
            key={idx}
          >
            {rate} {currRate === "viper" ? <TbCircleLetterV /> : "🕷"}
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

        {/* <select className="" onChange={(e) => setCurrRate(e.target.value)}>
          <option value="venom"> */}
        <div className="bg-color1 rounded-sm w-4/5 sm:w-3/6 px-2 py-2 border border-color3 outline-none;">
          $Viper &nbsp; &nbsp; &nbsp; &nbsp; 🕷 {parseInt(balance / 10 ** 18)}
        </div>
        {/* </option>
        </select> */}
      </div>
      {/* RECENT */}
      <div className="recent hidden lg:block">
        <div className="top p-2 bg-color3">Recent Plays</div>
        <div className="main_recent h-32 overflow-auto">
          <div className="text-sm grid grid-cols-3 text-center">
            <div>Player</div>
            <div>Wager</div>
            <div>Profit</div>
          </div>
          {recentGames.map((play) => (
            <div className="text-sm grid grid-cols-3 text-center">
              <div className="player">
                {play.wager.slice(0, 4)}...
                {play.wager.slice(-4, -1)}
              </div>
              <div className="wager">🕷 {play.stake}</div>
              <div
                className={`profit ${
                  play.win ? "text-green-600" : "text-red-600"
                }`}
              >
                🕷 {play.win ? 2 * play.stake : 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Currency;
