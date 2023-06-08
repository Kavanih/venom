import { Address, ProviderRpcClient } from "everscale-inpage-provider";

// Importing of our contract ABI from smart-contract build action. Of cource we need ABI for contracts calls.
import tokenRootAbi from "./abi/TokenRoot.abi.json";
import tokenWalletAbi from "./abi/TokenWallet.abi.json";

const DiceContractAddress = new Address(
  "0:6f5445bfcd0b4e2824a3c5eca1a56ab1dee8c137390bdb8e8263d7fbac778db5"
);
const tokenRoot = new Address(
  "0:38364ff88bdaebf2a0ef6341ad627a3116922f36e96d5f0629c62b48fb847dcf"
);
