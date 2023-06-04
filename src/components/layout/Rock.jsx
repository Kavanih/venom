import { useState } from "react";

const Rock = () => {
  const [choice, setChoice] = useState("");
  const [comp, setComp] = useState("");

  const choices = ["rock", "paper", "scissors"];

  const handleClick = (choise) => {
    setChoice(choise);
    generateComp();
  };

  const generateComp = () => {
    const rand = Math.floor(Math.random() * 3);
    setComp(choices[rand]);
    console.log(comp);
  };

  return (
    <div className="text-2xl">
      <div className="mine">{choice}</div>
      <div className="status"></div>
      <div className="theis">{comp}</div>
      <div className="flex gap-4">
        {choices.map((cho, idx) => (
          <div
            onClick={() => handleClick(cho)}
            key={idx}
            className="border border-color3 cursor-pointer"
          >
            {cho}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rock;
