import { Address, toNano } from "locklift";
import { getBalance, sendToken } from "./utils";

const rootOwner = new Address("0:050bb184d078ac09404aad07f71e77b0567b0e91f7c561dbd2b17d78f9f0e5a7");
const tokenRoot = new Address("0:4b48307c6f59b4fcb2bf2fe4d6703a038825bc2b54ed0f43fedf5e68f299f301");

async function deploy() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const { contract: Faucet } = await locklift.factory.deployContract({
    contract: "Faucet",
    publicKey: signer.publicKey,
    initParams: { _nonce: locklift.utils.getRandomNonce() },
    constructorParams: { _tokenRoot: tokenRoot, _remainingTO: rootOwner },
    value: toNano(4),
  });
  console.log(`Faucet address is ${Faucet.address}`);

  //   await sendToken(rootOwner, Faucet.address, tokenRoot, 210, "", false);
  return Faucet;
}

async function main() {
  //   const Faucet = await deploy();

  const Faucet = locklift.factory.getDeployedContract(
    "Faucet",
    new Address("0:cdb02094d901fd520c970ba2def5e2de4c12d9563547eb26c1c5eba26a5447dd"),
  );
  console.log(await Faucet.methods.owner().call());
  console.log(await Faucet.methods.claim().send({ from: rootOwner, amount: toNano(5) }));
  //   console.log(await Faucet.methods.withdraw({ amount: 10 * 10 ** 18 }).send({ from: rootOwner, amount: toNano(5) }));
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
