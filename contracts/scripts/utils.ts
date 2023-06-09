import { Address, toNano } from "locklift";
import BigNumber from "bignumber.js";

const tokenRoot = new Address("0:4b48307c6f59b4fcb2bf2fe4d6703a038825bc2b54ed0f43fedf5e68f299f301");

async function tokenWallet(owner: Address) {
  const tokenRootContract = locklift.factory.getDeployedContract("TokenRoot", tokenRoot);
  const tokenWallet = await tokenRootContract.methods.walletOf({ answerId: 1, walletOwner: owner }).call();
  const tokenWalletContract = locklift.factory.getDeployedContract("TokenWallet", tokenWallet.value0);
  return tokenWalletContract;
}

export async function sendToken(sender: Address, receiver: Address, amount: number, payload: string, notify: boolean) {
  const tokenWalletContract = await tokenWallet(sender);
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

export async function getBalance(owner: Address) {
  const tokenWalletContract = await tokenWallet(owner);
  const balance = await tokenWalletContract.methods.balance({ answerId: 1 }).call();
  return balance;
}
