import { useContext, useState, useEffect } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import Currency from "./Currency";
import Alert from "./Alert";
import AlertContext from "../../Context/AlertContext/AlertContext";
import Loader from "./Loader";
import Loaders from "./Loader1";
import { Address } from "everscale-inpage-provider";
import { DataContext } from "../../Context/DataContext/DataContext";
import BigNumber from "bignumber.js";
import {
  getBalance,
  tokenRootAddress,
  getTokenWallet,
  getRecentGames,
  parseResult,
} from "../../utils";

import RPSAbi from "../../contracts/abis/RPS.abi.json";

const RPSAddress = new Address(
  "0:f067807872df6e12adada5af425b79d86edf276941fe097468185a4ac2816ca7"
);

const RPS = () => {
  const { VC, provider, isConnected, addr, setBalance } =
    useContext(DataContext);
  const [myChoice, setMyChoice] = useState(null);
  const [ourChoice, setOurChoice] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentGames, setRecentGames] = useState([]);
  const [ratee, setRate] = useState(5);
  const alertCon = useContext(AlertContext);
  const { addAlert } = alertCon;

  const choices = ["Rock", "Paper", "Scissors"];
  useEffect(() => {
    if (!provider) return;
    const contract = new provider.Contract(RPSAbi, RPSAddress);
    getRecentGames(contract).then((res) => {
      let parsed = parseResult("rps", res);
      setRecentGames(parsed);
    });
  }, [provider, ourChoice]);

  const choo = (choice) => {
    if (choice === "Rock") return <FaHandRock className="choice" />;
    else if (choice === "Paper") return <FaHandPaper className="choice" />;
    if (choice === "Scissors") return <FaHandScissors className="choice" />;
  };

  const startPlaying = async () => {
    if (!VC && !provider) return;
    if (!isConnected) {
      addAlert("You haven't connect your wallet");
      return;
    }
    if (!myChoice) {
      addAlert("You haven't selected your choice");
      return;
    }
    setLoading(true);
    let wage_amount = new BigNumber(ratee).multipliedBy(10 ** 18).toString();
    let amount = new BigNumber(1)
      .plus(new BigNumber(5).multipliedBy(10 ** 9))
      .toString();
    const contract = new provider.Contract(RPSAbi, RPSAddress);
    const data = await contract.methods
      .encode({
        _wager: addr,
        _tokenAddress: tokenRootAddress,
        _stake: wage_amount,
        _prediction: myChoice,
      })
      .call();
    const userTokenWallet = await getTokenWallet(provider, addr);
    let currentGameTime = (
      await contract.methods.getUserCurrentGame({ _owner: addr }).call()
    ).value0.blockTimestamp;
    console.log(currentGameTime);
    try {
      await userTokenWallet.methods
        .transfer({
          amount: wage_amount,
          recipient: RPSAddress,
          deployWalletValue: 2 * 10 ** 9,
          notify: true,
          payload: data.value0,
          remainingGasTo: addr,
        })
        .send({ from: addr, amount });

      let newGame = await contract.methods
        .getUserCurrentGame({ _owner: addr })
        .call();
      if (newGame.value0.blockTimestamp !== currentGameTime) {
        let gameData = newGame.value0;
        setOurChoice(gameData.opponentChoice);
        if (gameData.result === "win") {
          addAlert("You Won");
        } else if (gameData.result === "tie") {
          addAlert("It's a tie!");
        } else {
          addAlert("You Lost");
        }
        console.log(gameData);
      } else {
        addAlert("Game not placed");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      return;
    }
    let newbal = await getBalance(VC, provider, addr);
    setBalance(newbal);

    setStatus("");
  };

  return (
    <div className="biggie">
      <Alert />
      {/* LEFT */}
      <Currency recentGames={recentGames} ratee={ratee} setRate={setRate} />
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
            {ourChoice && !loading ? (
              choo(ourChoice)
            ) : (
              <div className="choice">{loading ? <Loaders /> : "🕷"}</div>
            )}
          </div>
        </div>
        <div className="text-center">
          {loading ? (
            <Loader />
          ) : (
            <button className="play_btn" onClick={startPlaying}>
              Play
            </button>
          )}
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
