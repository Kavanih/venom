import { Address } from "everscale-inpage-provider";
import tokenRootAbi from "./contracts/abis/TokenRoot.abi.json";
import tokenWalletAbi from "./contracts/abis/TokenWallet.abi.json";
import faucetAbi from "./contracts/abis/Faucet.abi.json";
import BigNumber from "bignumber.js";

export const tokenRootAddress =
  "0:4b48307c6f59b4fcb2bf2fe4d6703a038825bc2b54ed0f43fedf5e68f299f301";

const faucetAddress = new Address(
  "0:cdb02094d901fd520c970ba2def5e2de4c12d9563547eb26c1c5eba26a5447dd"
);

export const getBalance = async (VC, provider, addr) => {
  if (!VC) return;
  const standalone = await VC?.getStandalone("venomwallet");
  if (!standalone) {
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

export const getTokenWallet = async (provider, owner) => {
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

export const getRecentGames = async (contract) => {
  const games = await contract.methods.games().call();
  return games.games.reverse().slice(0, 5);
};

export const parseResult = (gameType, recents) => {
  if (gameType === "dice") {
    let parseSed = recents.map((recent) => {
      let gameRes = parseInt(recent.result);
      let win =
        (gameRes % 2 === 0 && recent.prediction === "even") ||
        (gameRes % 2 !== 0 && recent.prediction === "odd");
      return {
        wager: recent.wager._address,
        stake: parseInt(recent.stake) / 10 ** 18,
        win: win,
      };
    });
    return parseSed;
  } else if (gameType === "coin") {
    let parseSed = recents.map((recent) => {
      return {
        wager: recent.wager._address,
        stake: parseInt(recent.stake) / 10 ** 18,
        win: recent.result === recent.prediction,
      };
    });
    return parseSed;
  } else if (gameType === "rps") {
    let parseSed = recents.map((recent) => {
      return {
        wager: recent.wager._address,
        stake: parseInt(recent.stake) / 10 ** 18,
        win: recent.result === "win",
      };
    });
    return parseSed;
  }
};

export const claimFaucet = async (provider, addr, addAlert) => {
  if (!provider) return;
  const Faucet = new provider.Contract(faucetAbi, faucetAddress);
  try {
    let amount = new BigNumber(1)
      .plus(new BigNumber(5).multipliedBy(10 ** 9))
      .toString();
    let res = await Faucet.methods.claim().send({ from: addr, amount });
    console.log(res);
    addAlert("Faucet Claimed");
  } catch (e) {
    console.log(e);
    addAlert("Error claiming Faucet");
  }
};
