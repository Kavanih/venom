import { useContext, useEffect, useState } from "react";
import Currency from "./Currency";
import Alert from "./Alert";
import AlertContext from "../../Context/AlertContext/AlertContext";
import Loader from "./Loader";
import { DataContext } from "../../Context/DataContext/DataContext";

import tokenRootAbi from "../../contracts/abis/TokenRoot.abi.json";
import tokenWalletAbi from "../../contracts/abis/TokenWallet.abi.json";
import DiceAbi from "../../contracts/abis/Dice.abi.json";
import BigNumber from "bignumber.js";
import { Address } from "everscale-inpage-provider";

const Dice = () => {
  const { VC, provider, isConnected, addr } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const alertCon = useContext(AlertContext);
  const { addAlert } = alertCon;

  const [diceNumber, setDiceNumber] = useState(0);
  const [numType, setNumType] = useState("");
  const [status, setStatus] = useState("");
  const [ratee, setRate] = useState(5);
  const [balance, setBalance] = useState(0);

  const tokenRootAddress =
    "0:4b48307c6f59b4fcb2bf2fe4d6703a038825bc2b54ed0f43fedf5e68f299f301";

  const diceAddress = new Address(
    "0:db03d764adf8c2941680c300f4a29ff40b5953b4346c2e78db665b68b0214816"
  );

  useEffect(() => {
    if (addr) {
      getBalance().then((bal) => {
        console.log(bal / 10 ** 18);
        console.log("Balance retrived");
        setBalance(bal);
      });
    }
  }, [addr]);

  const playGame = async () => {
    if (!VC && !provider) return;
    if (!isConnected) {
      addAlert("You haven't connect your wallet");
      return;
    }

    if (!numType) {
      addAlert("You haven't chosen your number type");
      return;
    }
    let wage_amount = new BigNumber(ratee).multipliedBy(10 ** 18).toString();
    const contract = new provider.Contract(DiceAbi, diceAddress);
    let amount = new BigNumber(1)
      .plus(new BigNumber(5).multipliedBy(10 ** 9))
      .toString();
    const data = await contract.methods
      .encode({
        _wager: addr,
        _tokenAddress: tokenRootAddress,
        _stake: wage_amount,
        _prediction: numType,
      })
      .call();

    const userTokenWallet = await getTokenWallet(provider, addr);

    setLoading(true);
    let currentGameTime = (
      await contract.methods.getUserCurrentGame({ _owner: addr }).call()
    ).value0.blockTimestamp;
    console.log(currentGameTime);
    try {
      let res = await userTokenWallet.methods
        .transfer({
          amount: wage_amount,
          recipient: diceAddress,
          deployWalletValue: 2 * 10 ** 9,
          notify: true,
          payload: data.value0,
          remainingGasTo: addr,
        })
        .send({ from: addr, amount });
      console.log(res);
    } catch (e) {
      setLoading(false);
      return;
    }

    let newGame = await contract.methods
      .getUserCurrentGame({ _owner: addr })
      .call();
    if (newGame.value0.blockTimestamp !== currentGameTime) {
      let game = newGame.value0;
      console.log(game);
      let result = game.result;
      if (
        (result % 2 === 0 && numType === "even") ||
        (result % 2 !== 0 && numType === "odd")
      ) {
        addAlert("You won");
        setStatus("You won");
      } else {
        addAlert("You lost");
        setStatus("You lost");
      }
      setDiceNumber(result);
      console.log(game);
      let newbal = await userTokenWallet.methods
        .balance({ answerId: 2 })
        .call();
      setBalance(newbal.value0);
    } else {
      addAlert("Game not placed");
    }
    setLoading(false);
  };

  const getTokenWallet = async (provider, owner) => {
    const rootAdress = new Address(tokenRootAddress);
    const rootContract = new provider.Contract(tokenRootAbi, rootAdress);
    const tokenWallet = await rootContract.methods
      .walletOf({
        answerId: 0,
        walletOwner: owner,
      })
      .call();
    let tokenWalletAddress = tokenWallet.value0._address;
    console.log(tokenWalletAddress);
    tokenWalletAddress = new Address(tokenWalletAddress);
    const tokenWalletContract = new provider.Contract(
      tokenWalletAbi,
      tokenWalletAddress
    );
    return tokenWalletContract;
  };

  const getBalance = async () => {
    if (!VC) return;
    const standalone = await VC?.getStandalone("venomwallet");
    if (!standalone) {
      addAlert("Standalone client not avaialbe");
      return;
    }
    if (!provider) return;
    const rootAdress = new Address(tokenRootAddress);
    const rootContract = new standalone.Contract(tokenRootAbi, rootAdress);
    const tokenWallet = await rootContract.methods
      .walletOf({
        answerId: 0,
        walletOwner: addr,
      })
      .call();
    let tokenWalletAddress = tokenWallet.value0._address;
    console.log(tokenWalletAddress);
    tokenWalletAddress = new Address(tokenWalletAddress);
    const tokenWalletContract = new standalone.Contract(
      tokenWalletAbi,
      tokenWalletAddress
    );
    try {
      const result = await tokenWalletContract.methods
        .balance({ answerId: 0 })
        .call();
      return result.value0.toString();
    } catch (e) {
      return 0;
    }
  };

  // YOU KNOW WHAT TO DO WITH THIS
  const startGame = () => {
    if (!numType) {
      addAlert("You haven't chosen your number type");
      return;
    }
    setLoading(true);

    const rand = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setDiceNumber(rand);
      const numm = rand % 2 === 0 ? "even" : "odd";
      if (numm === numType) {
        setStatus("You won");
      } else {
        setStatus("You lost");
      }
      setLoading(false);
    }, 5000);
  };

  return (
    <div className="biggie">
      <Alert />
      {/* LEFT */}
      <Currency
        cho1="even"
        cho2="odd"
        side={numType}
        ratee={ratee}
        setRate={setRate}
        setSide={setNumType}
        bal={balance}
      />
      {/* RIGHT */}
      <div className="right flex flex-col justify-between">
        <div className="w-64 h-64 mx-auto flex justify-center items-center mb-4">
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
          {loading ? (
            <Loader />
          ) : (
            <button className="play_btn" onClick={playGame}>
              Roll Dice
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

export default Dice;
