import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  ABI_FACTORY_SEPOLIA,
  CONTRACT_ADDRESS_FACTORY_SEPOLIA,
  ABI_CAMPAIGN_SEPOLIA
} from "../constants";
import useConnectWeb3 from "../useConnectWeb3/useConnectWeb3";
import { withdrawCampaign } from "../../API/owneractions";

declare var window: any;

const useWithdraw = (contractAddress: string) => {
  const { signer, connectedToMetamask, connectToMetamask } = useConnectWeb3();
  const [response, setResponse] = useState<string>("");
  console.log("useWithDraw param: ", contractAddress);

  const updateCampaignBackend = async (
    ADDRESS: string,
    FINAL_AMOUNT: number
  ) => {
    console.log("updateCampaignBackend params: ", ADDRESS, FINAL_AMOUNT);

    try {
      console.log("----- UPDATING CAMPAIGN IN THE BACKEND -----");
      const res = await withdrawCampaign(
        ADDRESS,
        FINAL_AMOUNT
      );
      console.log("useWithdraw: updateCampaignBackend: res: ", res);
      if (res.status === 201) {
        console.log("WITHDRAW SUCCESSFULL");
      }
    } catch (error: any) {
      console.log("useWithdraw_error: ", error);
      return;
    }
  }

  const listenForCampaignEvent = async (CONTRACT: ethers.Contract) => {
    console.log("----- LISTENING TO THE EVENT -----");
    await CONTRACT.on(
      "CampaignClosed",
      async (finalAmount) => {
        console.log("CampaignClosed event triggered: ", {
          finalAmount: finalAmount,
        });
        console.log("----- EVENT LISTENING COMPLETED -----");
        const formattedFinalAmount = ethers.formatEther(BigInt(finalAmount));
        await updateCampaignBackend(
          contractAddress,
          Number(formattedFinalAmount)
        );
        console.log("Done!");
      }      
    )
  }

  const withdrawCampaignOnChain = async (
    ADDRESS: string
  ) => {
    console.log("withdrawCampaignOnChain reached...");
    // access teh contract on chain
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        ADDRESS,
        ABI_CAMPAIGN_SEPOLIA,
        signer
      );

    // withdraw from the contract
      try {
        const transactionResponse = await contract.withdraw();

        console.log("Transaction Response: ", transactionResponse);
        await listenForCampaignEvent(contract);
      } catch (error: any) {
        console.log("Error: ", error);
        setResponse(error.code);
      }
    } else {
      console.log("Metamask is not installed!");
    }
  };

    const withdraw = async () => {
      await connectToMetamask();

      if (!connectedToMetamask) {
        console.log("Failed to connect!");
        return;
      }

      await withdrawCampaignOnChain(contractAddress);
      setResponse("WITHDRAW SUCCESSFUL!");
    }

    return {
      response, signer, connectedToMetamask,
      connectToMetamask, updateCampaignBackend, listenForCampaignEvent, withdrawCampaignOnChain,
      withdraw
    };
};


export default useWithdraw;