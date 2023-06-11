import { Address, toNano } from "locklift";
import BigNumber from "bignumber.js";

async function tokenWallet(token: Address, owner: Address) {
  const tokenRootContract = locklift.factory.getDeployedContract("TokenRoot", token);
  const tokenWallet = await tokenRootContract.methods.walletOf({ answerId: 1, walletOwner: owner }).call();
  const tokenWalletContract = locklift.factory.getDeployedContract("TokenWallet", tokenWallet.value0);
  return tokenWalletContract;
}

export async function sendToken(
  sender: Address,
  receiver: Address,
  token: Address,
  amount: number,
  payload: string,
  notify: boolean,
) {
  const tokenWalletContract = await tokenWallet(token, sender);
  console.log(`Token wallet ${tokenWalletContract.address}`);
  let res = await tokenWalletContract.methods
    .transfer({
      amount: new BigNumber(amount).multipliedBy(10 ** 18).toString(),
      recipient: receiver,
      deployWalletValue: 1,
      notify: notify,
      payload: payload,
      remainingGasTo: sender,
    })
    .send({ from: sender, amount: toNano(3) });
  return res;
}

export async function getBalance(token: Address, owner: Address) {
  const tokenWalletContract = await tokenWallet(token, owner);
  const balance = await tokenWalletContract.methods.balance({ answerId: 1 }).call();
  return balance;
}
