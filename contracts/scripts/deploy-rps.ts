import { Address, toNano, WalletTypes, Signer, zeroAddress } from "locklift";
import { getBalance, sendToken } from "./utils";

const rootOwner = new Address("0:050bb184d078ac09404aad07f71e77b0567b0e91f7c561dbd2b17d78f9f0e5a7");
const tokenRoot = new Address("0:6e8fb576bfc91728a876fc6d6b9e4f40c2695a19bede61b02ad02e01c7aae346");
const account2 = new Address("0:4c59c2d9d8498c8a797a2426a4570ed5600e5d3fea43dc7b0d948650a445174b");

async function deploy() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const { contract: Contract } = await locklift.factory.deployContract({
    contract: "RPS",
    publicKey: signer.publicKey,
    initParams: { _nonce: locklift.utils.getRandomNonce() },
    constructorParams: { _tokenRoot: tokenRoot, _remainingTO: rootOwner },
    value: toNano(4),
  });
  console.log(`RPS deployed at ${Contract.address.toString()}`);
  await sendToken(rootOwner, Contract.address, tokenRoot, 1000, "", false);
  let tkWallet = await Contract.methods.getTokenWallet().call();
  console.log(await getBalance(tokenRoot, Contract.address));
  console.log(`RPS Wallet deployed at ${tkWallet.value0}`);
  return Contract;
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
  //   const RPS = await deploy();
  const RPS = locklift.factory.getDeployedContract(
    "RPS",
    new Address("0:c4022919ebab78c56949cad5d0fa5ab3a1b1ed0bacecb8f639cbbf9fc3ea9352"),
  );
  const data = {
    _wager: rootOwner,
    _tokenAddress: tokenRoot,
    _stake: 2 * 10 ** 18,
    _prediction: 1,
  };

  const payload = await RPS.methods.encode(data).call();
  console.log(payload);

  const tokenRootContract = locklift.factory.getDeployedContract("TokenRoot", tokenRoot);

  const tokenWallet = await tokenRootContract.methods.walletOf({ answerId: 1, walletOwner: rootOwner }).call();
  const tokenWalletContract = locklift.factory.getDeployedContract("TokenWallet", tokenWallet.value0);
  console.log(await tokenWalletContract.methods.balance({ answerId: 1 }).call());
  await sendToken(rootOwner, RPS.address, tokenRoot, 2, payload.value0, true);
  console.log(await tokenWalletContract.methods.balance({ answerId: 1 }).call());
  let game = await RPS.methods.getUserCurrentGame({ _owner: rootOwner }).call();
  console.log(game);
  //   console.log(`DIce Address is ${Dice.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
