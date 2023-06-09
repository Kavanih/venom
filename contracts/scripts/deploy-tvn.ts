import { Address, WalletTypes, getRandomNonce, toNano, zeroAddress } from "locklift";
import { getBalance, sendToken } from "./utils";

const rootOwner = new Address("0:050bb184d078ac09404aad07f71e77b0567b0e91f7c561dbd2b17d78f9f0e5a7");
const tokenRoot = new Address("0:4b48307c6f59b4fcb2bf2fe4d6703a038825bc2b54ed0f43fedf5e68f299f301");
const diceAddress = new Address("0:db03d764adf8c2941680c300f4a29ff40b5953b4346c2e78db665b68b0214816");
const diceTest = new Address("0:07bf57dd22a040ae7d482635ddd62c7a6fde071439a3d1edfa15905939cf120f");
const account2 = new Address("0:4c59c2d9d8498c8a797a2426a4570ed5600e5d3fea43dc7b0d948650a445174b");

async function Deployer() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const { contract: Dice } = await locklift.factory.deployContract({
    contract: "Dice",
    publicKey: signer.publicKey,
    initParams: { _nonce: locklift.utils.getRandomNonce() },
    constructorParams: { _tokenRoot: tokenRoot, _remainingTO: rootOwner },
    value: toNano(4),
  });
  console.log(`Dice deployed at ${Dice.address.toString()}`);
  await sendToken(rootOwner, Dice.address, 1000, "", false);
  let tkWallet = await Dice.methods.getTokenWallet().call();
  console.log(await getBalance(Dice.address));
  console.log(`Dice Wallet deployed at ${tkWallet.value0}`);
  return Dice;
}

async function main() {
  //   const Dice = await Deployer();
  const Dice = locklift.factory.getDeployedContract("Dice", diceAddress);
  let gamesa = await Dice.methods.games().call();
  console.log(gamesa.games.length);

  const data = await Dice.methods
    .encode({
      _wager: account2,
      _tokenAddress: tokenRoot,
      _stake: 1 * 10 ** 18,
      _prediction: "even",
    })
    .call();

  console.log(`Dice deployed at ${Dice.address.toString()}`);
  //   console.log(await Dice.methods.getTokenWallet().call());
  //   let res = await sendToken(account2, Dice.address, 1, data.value0, true);
  //   console.log(res);
  //   console.log(await Dice.methods.state().call());
  console.log(await Dice.methods.getUserCurrentGame({ _owner: account2 }).call());
  return;
  console.log(await getBalance(account2));

  //   console.log(res);

  return;
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
