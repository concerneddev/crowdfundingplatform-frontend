import React, { useContext, useState, useEffect } from "react";
import Form from "../Form";
import { createCampaign } from "../../API/owneractions";
import { GlobalStateContext } from "../../contexts/GlobalStateProvider";
import { ethers } from "ethers";
import {
  ABI_FACTORY_ANVIL,
  CONTRACT_ADDRESS_FACTORY_ANVIL,
} from "../../web3/constants";

declare var window: any;

interface CampaignData {
  contractAddress: string;
  ownerPublicKey: string;
  title: string;
  description: string;
  goalAmount: number;
  tags: string[];
}

const CreateCampaign: React.FC = () => {
  const [formData, setFormData] = useState<CampaignData>({
    contractAddress: "",
    ownerPublicKey: "",
    title: "",
    description: "",
    goalAmount: 0,
    tags: [],
  });

  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalStateContext);
  const [response, setResponse] = useState<string>("");
  const [signer, setSigner] = useState<string>("");
  const [connectedToMetamask, setConnectedToMetamask] =
    useState<boolean>(false);

  const [camapignAddress, setCampaignAddress] = useState<string>("");
  const [chainLoading, setChainLoading] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const createAndListenForCampaign = async (formGoalAmount: number) => {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS_FACTORY_ANVIL,
          ABI_FACTORY_ANVIL,
          signer
        );
  
        try {
          const goalAmount: number = formGoalAmount;
          const goalAmountUint256: bigint = BigInt(goalAmount);
          console.log(formData.goalAmount);
  
          const transactionResponse = await contract.createCampaign(goalAmountUint256);
  
          console.log("Transaction Response: ", transactionResponse)
          await contract.on(
            "CampaignContractCreated",
            (campaignAddress, senderAddress, goalAmount, event) => {
              console.log("CampaignContractCreated event triggered: ", {
                  campaignAddress: campaignAddress,
                  senderAddress: senderAddress,
                  goalAmount: goalAmount,
                  data: event,
              });
              setCampaignAddress(campaignAddress);
            });
          console.log("Done!");
        } catch (error) {
          console.log(error);
          return;
        }
      } else {
        console.log("Something went wrong!");
      }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createAndListenForCampaign(formData.goalAmount);
    setChainLoading(false);

    if(chainLoading === false) {
        try {
            const response = await createCampaign(
              camapignAddress,
              signer,
              formData.title,
              formData.description,
              formData.goalAmount,
              formData.tags
            );
      
            setResponse("Campaign created successfully!");
            console.log("Campaign creation response:", response);
          } catch (error) {
            console.error("Error creating campaign:", error);
            setResponse("An error occurred. Please try again.");
          }
    }    
  };

  useEffect(() => {
    const tokenExists = sessionStorage.getItem("x-auth-token");
    console.log("Login: isLoggedIn: ", isLoggedIn);

    if (tokenExists && !isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setResponse("Please log in.");
    }
  }, []);

  useEffect(() => {
    setChainLoading(false);
  }, [chainLoading]);

  const fields = [
    { label: "Campaign Title", name: "title", type: "text", required: true },
    {
      label: "Campaign Description",
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      label: "Goal Amount",
      name: "goalAmount",
      type: "number",
      required: true,
    },
    { label: "Tags (Comma-separated)", name: "tags", type: "text" },
  ];

  return (
    <div className="container mx-auto">
      {!connectedToMetamask ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <button
            onClick={connectToMetamask}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect to MetaMask
          </button>
        </div>
      ) : (
        <Form
          formTitle="Create Campaign"
          buttonName="Submit"
          onSubmit={handleSubmit}
          onChange={handleChange}
          response={response}
          fields={fields}
        />
      )}
    </div>
  );
};

export default CreateCampaign;
