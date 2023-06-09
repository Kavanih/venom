import { Address, getRandomNonce, toNano, zeroAddress } from "locklift";
import BigNumber from "bignumber.js";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;

  // Address of initial token supply recipient (write your own)
  const initialSupplyTo = new Address("0:050bb184d078ac09404aad07f71e77b0567b0e91f7c561dbd2b17d78f9f0e5a7");
  // Address of token owner (write your own)
  const rootOwner = new Address("0:050bb184d078ac09404aad07f71e77b0567b0e91f7c561dbd2b17d78f9f0e5a7");
  // Name of the token
  const name = "DIce Venom Token2";
  // Symbol of the token
  const symbol = "DVT";
  // How many token will be issued instantly after deploy
  const initialSupply = 10000;
  // The number of decimals the token uses
  const decimals = 18;
  // If `true`, disables token minting
  const disableMint = false;
  // If `true`, disables token burning by root
  const disableBurnByRoot = false;
  // If `true`, pauses token burning
  const pauseBurn = false;

  /* 
    Returns compilation artifacts based on the .tsol file name
      or name from value config.externalContracts[pathToLib].
  */
  const TokenWallet = locklift.factory.getContractArtifacts("TokenWallet");

  /* 
    Deploy the TIP-3 Token Root contract.
    @params deployWalletValue: Along with the deployment of the root token,
      the wallet will be automatically deployed to the owner. 
      This is the amount of EVERs that will be sent to the wallet.
  */
  const { contract: tokenRoot } = await locklift.factory.deployContract({
    contract: "TokenRoot",
    publicKey: signer.publicKey,
    initParams: {
      deployer_: zeroAddress, // this field should be zero address if deploying with public key (see source code)
      randomNonce_: getRandomNonce(),
      rootOwner_: rootOwner,
      name_: name,
      symbol_: symbol,
      decimals_: decimals,
      walletCode_: TokenWallet.code,
    },
    constructorParams: {
      initialSupplyTo: initialSupplyTo,
      initialSupply: new BigNumber(initialSupply).shiftedBy(decimals).toFixed(),
      deployWalletValue: toNano(1),
      mintDisabled: disableMint,
      burnByRootDisabled: disableBurnByRoot,
      burnPaused: pauseBurn,
      remainingGasTo: initialSupplyTo,
    },
    value: toNano(5),
  });

  console.log(`${name}: ${tokenRoot.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
