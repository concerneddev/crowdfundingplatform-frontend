import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import {
    ABI_FACTORY_SEPOLIA,
    CONTRACT_ADDRESS_FACTORY_SEPOLIA
} from "./constants";

declare var window: any;

const [response, setResponse] = useState<string>("");
const [signer, setSigner] = useState<string>("");
const [connectedToMetamask, setConnectedToMetamask] = useState<boolean>(false);

const withdrawCampaign = () => {
    // connect to metamask
    const connectToMetamask = async () => {
        if (typeof window.ethereum !== "undefined") {
          try {
            const res = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
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

    const updateCampaignBackend = async () => {

    }

    const listenForCampaignEvent = async () => {

    }

    const withdrawCampaignOnChain = async () => {

    }

}

export default withdrawCampaign;