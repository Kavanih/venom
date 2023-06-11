import { Address } from "everscale-inpage-provider";
import tokenRootAbi from "./contracts/abis/TokenRoot.abi.json";
import tokenWalletAbi from "./contracts/abis/TokenWallet.abi.json";

export const tokenRootAddress =
  "0:4b48307c6f59b4fcb2bf2fe4d6703a038825bc2b54ed0f43fedf5e68f299f301";

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
