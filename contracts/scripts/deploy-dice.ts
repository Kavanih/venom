import { Address, toNano, WalletTypes, Signer, zeroAddress } from "locklift";
import { getBalance, sendToken } from "./utils";

const rootOwner = new Address("0:050bb184d078ac09404aad07f71e77b0567b0e91f7c561dbd2b17d78f9f0e5a7");
const tokenRoot = new Address("0:6e8fb576bfc91728a876fc6d6b9e4f40c2695a19bede61b02ad02e01c7aae346");
const account2 = new Address("0:4c59c2d9d8498c8a797a2426a4570ed5600e5d3fea43dc7b0d948650a445174b");

async function deploy() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const { contract: Dice } = await locklift.factory.deployContract({
    contract: "Dice",
    publicKey: signer.publicKey,
    initParams: { _nonce: locklift.utils.getRandomNonce() },
    constructorParams: { _tokenRoot: tokenRoot, _remainingTO: rootOwner },
    value: toNano(4),
  });
  console.log(`Dice deployed at ${Dice.address.toString()}`);
  await sendToken(rootOwner, Dice.address, tokenRoot, 1000, "", false);
  let tkWallet = await Dice.methods.getTokenWallet().call();
  console.log(await getBalance(tokenRoot, Dice.address));
  console.log(`Dice Wallet deployed at ${tkWallet.value0}`);
  return Dice;
}

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;

  const account = await locklift.factory.accounts.addExistingAccount({
    type: WalletTypes.EverWallet,
    address: rootOwner,
  });

  const Account2 = await locklift.factory.accounts.addExistingAccount({
    type: WalletTypes.EverWallet,
    address: account2,
  });

  const tokenRootContract = locklift.factory.getDeployedContract("TokenRoot", tokenRoot);
  const tokenWallet = await tokenRootContract.methods.walletOf({ answerId: 1, walletOwner: rootOwner }).call();
  const tokenWalletContract = locklift.factory.getDeployedContract("TokenWallet", tokenWallet.value0);
  const Dice = await deploy();
  console.log(`DIce Address is ${Dice.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
