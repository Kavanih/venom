import React, { createContext, useEffect, useState } from "react";
import { initVenomConnect } from "../../components/venom-connect/configure";
// Create a new context
const DataContext = createContext();

// Create a context provider component
const DataContextProvider = ({ children }) => {
  // Define the state or any data you want to share
  const [VC, setVC] = useState();
  const [addr, setAddr] = useState();
  const [pubkey, setPubkey] = useState();
  const [provider, setProvider] = useState();
  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    (async () => {
      const _vc = await initVenomConnect();
      setVC(_vc);
    })();
  }, []);

  useEffect(() => {
    // connect event handler
    const off = VC?.on("connect", onConnect);
    if (VC) (async () => await VC.checkAuth())();

    // just an empty callback, cuz we don't need it
    return () => {
      off?.();
    };
  }, [VC]);

  const getAddress = async (provider) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.address.toString();
  };

  const getPubkey = async (provider) => {
    const providerState = await provider?.getProviderState?.();
    return providerState?.permissions.accountInteraction?.publicKey;
  };

  const onConnect = async (provider) => {
    setProvider(provider);
    const venomWalletAddress = provider
      ? await getAddress(provider)
      : undefined;
    const publicKey = provider ? await getPubkey(provider) : undefined;
    setAddr(venomWalletAddress);
    setPubkey(publicKey);
    setIsConnected(true);
  };

  const onDisconnect = async () => {
    await provider?.disconnect();
    setAddr(undefined);
    setPubkey(undefined);
    setIsConnected(false);
  };

  // Define any functions or methods you want to share

  // Define the context value
  const contextValue = {
    VC,
    addr,
    pubkey,
    provider,
    isConnected,
    onDisconnect,
  };

  // Return the context provider with the provided value and children
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
