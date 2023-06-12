import { useState, useContext, useEffect } from "react";
import Currency from "./Currency";
import AlertContext from "../../Context/AlertContext/AlertContext";
import Alert from "./Alert";
import Loader from "./Loader";
import { Address } from "everscale-inpage-provider";
import { DataContext } from "../../Context/DataContext/DataContext";
import {
  getBalance,
  tokenRootAddress,
  getTokenWallet,
  getRecentGames,
  parseResult,
} from "../../utils";
import BigNumber from "bignumber.js";

import CoinAbi from "../../contracts/abis/Coin.abi.json";

const CoinAddress = new Address(
  "0:c4f476eea445d2109b0ec84ad38baabaf5077aac32f1dacf0cb98850b208b9f9"
);

const dunno = {
  head: 1,
  tail: 2,
};

const CoinFlip = () => {
  const { VC, provider, isConnected, addr } = useContext(DataContext);
  const [balance, setBalance] = useState(0);
  const [side, setSide] = useState("");
  const [loading, setLoading] = useState(false);
  const [ratee, setRate] = useState(5);
  const [res, setResult] = useState("");
  const [recentGames, setRecentGames] = useState([]);
  const alertCon = useContext(AlertContext);
  const { addAlert } = alertCon;

  useEffect(() => {
    if (addr) {
      getBalance(VC, provider, addr).then((bal) => {
        console.log(bal / 10 ** 18);
        console.log("Balance retrived");
        setBalance(bal);
      });
    }
  }, [addr]);

  useEffect(() => {
    if (!provider) return;
    const contract = new provider.Contract(CoinAbi, CoinAddress);
    getRecentGames(contract).then((res) => {
      let parsed = parseResult("coin", res);
      setRecentGames(parsed);
    });
  }, [provider, res]);

  const startPlaying = async () => {
    if (!VC && !provider) return;
    if (!isConnected) {
      addAlert("You haven't connect your wallet");
      return;
    }

    if (!side) {
      addAlert("You haven't chosen your side");
      return;
    }
    setLoading(true);
    let wage_amount = new BigNumber(ratee).multipliedBy(10 ** 18).toString();
    let amount = new BigNumber(1)
      .plus(new BigNumber(5).multipliedBy(10 ** 9))
      .toString();
    const contract = new provider.Contract(CoinAbi, CoinAddress);
    const data = await contract.methods
      .encode({
        _wager: addr,
        _tokenAddress: tokenRootAddress,
        _stake: wage_amount,
        _prediction: dunno[side],
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
          recipient: CoinAddress,
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
        console.log(gameData);
        let res = Object.keys(dunno).find(
          (key) => dunno[key] == gameData.result
        );
        setResult(res);
        if (res === side) {
          addAlert("You Won");
        } else {
          addAlert("You Lost");
        }
        console.log(res);
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
  };

  return (
    <div className="biggie">
      <Alert />
      {/* LEFT */}
      <Currency
        cho1="tail"
        cho2="head"
        side={side}
        setSide={setSide}
        ratee={ratee}
        setRate={setRate}
        bal={balance}
        recentGames={recentGames}
      />
      {/* RIGHT */}
      <div className="right ">
        <div
          className={`coin_cont mb-6 lg:mb-0 ${loading ? "flipper" : ""}`}
          style={{
            transform: `rotateY(${res === "head" ? "0deg" : "180deg"})`,
          }}
        >
          <img src="/img/tails.png" alt="" className="back_image transform" />
          <img src="/img/heads.png" alt="" className="front_image transform" />
        </div>
        <div className="text-center mt-8">
          {loading ? (
            <Loader />
          ) : (
            <button className="play_btn" onClick={startPlaying}>
              Roll Dice
            </button>
          )}
          <div className="status">{res}</div>
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
