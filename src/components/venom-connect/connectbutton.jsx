import React, { useContext } from "react";
import { DataContext } from "../../Context/DataContext/DataContext";

function ConnectButton() {
  const { VC, addr, onDisconnect } = useContext(DataContext);

  const login = async () => {
    if (!VC) return;
    await VC.connect();
  };
  return (
    <div>
      {addr ? (
        <button
          onClick={onDisconnect}
          className="bg-[#008000] px-4 py-2 rounded-[5px]"
        >
          {`${addr.slice(0, 6)}...${addr.slice(-4)}`}
        </button>
      ) : (
        <button
          onClick={login}
          className="font-raleway bg-[#008000] px-4 py-2 rounded-[5px]"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ConnectButton;
