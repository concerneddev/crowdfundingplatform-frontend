import React, { useState } from "react";
import { ethers } from "ethers";

declare var window: any;

interface ConnectWeb3HookReturn {
  signer: string;
  connectedToMetamask: boolean;
  connectToMetamask: () => Promise<void>;
}

const useConnectWeb3 = (): ConnectWeb3HookReturn => {
  const [signer, setSigner] = useState<string>("");
  const [connectedToMetamask, setConnectedToMetamask] = useState<boolean>(false);

  const connectToMetamask = async (): Promise<void> => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const res = await window.ethereum.request({ method: "eth_requestAccounts" });
        setSigner(res[0]);
        console.log("Signer:", res[0]);
        setConnectedToMetamask(true);
      } catch (error) {
        console.log("Failed Connecting to Metamask: ", error);
      }
    } else {
      alert("Metamask is not installed!");
    }
  };

  return { signer, connectedToMetamask, connectToMetamask };
};

export default useConnectWeb3;
