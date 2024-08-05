import React, { useContext, useState, useEffect } from "react";
import { donateCampaign } from "../../API/donoractions";
import { campaignById } from "../../API/useractions";
import { GlobalStateContext } from "../../contexts/GlobalStateProvider";
import { ethers } from "ethers";
import {
  ABI_CAMPAIGN_SEPOLIA,
  ABI_FACTORY_ANVIL,
  CONTRACT_ADDRESS_FACTORY_ANVIL,
} from "../../web3/constants";
import Form from "../Form";
import { useParams } from "react-router-dom";

declare let window: any;

/*
{
  "contractAddress": "0xbc1615972af72d8f2f856967aec76d1e5856ffe9",
  "donorPublicKey": "0xFC5272061F97D5F907C25bC9e7dda26C712Ac803",
  "donationAmount": 5,
} 
*/

interface DonationData {
  contractAddress: string;
  donorPublicKey: string;
  donationAmount: number;
}

const DonateCampaign: React.FC = () => {
  const [formData, setFormData] = useState<DonationData>({
    contractAddress: "",
    donorPublicKey: "",
    donationAmount: 0,
  });

  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalStateContext);
  const [response, setResponse] = useState<string>("");
  const [campaignId, setCampaignId] = useState<string>();
  const [signer, setSigner] = useState<string>("");
  const [connectedToMetamask, setConnectedToMetamask] =
    useState<boolean>(false);
  const [campaignContractAddress, setCampaignContractAddress] =
    useState<string>();

  const { id } = useParams<string>();

  // ----- Handle Donation Form -----
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // ----- CONNECT TO METAMASK -----
  const connectToMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const res = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setSigner(res[0]);
        console.log("Signer:", res[0]);
        setConnectedToMetamask(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(res[0]);
        console.log("User Balance: ", ethers.parseEther(String(balance)));
      } catch (error) {
        console.log("Failed Connecting to Metamask: ", error);
      }
    } else {
      alert("Metamask is not installed!");
    }
  };

  // ----- Fetch the contract address of the campaign -----
  const fetchCampaignContractAddress = async (ID: string) => {
    console.log(" ----- FETCHING CAMPAIGN CONTRACT ADDRESS -----");
    try {
      if (ID) {
        const res = await campaignById(ID);
        console.log("CreateDonation: res: ", res);
        console.log("CreateDonation: res.data.campaign: ", res.data.campaign);
        console.log(
          "CreateDonation: res.data.campaign.contractAddress: ",
          res.data.campaign.contractAddress
        );
        const contractAddress = res.data.campaign.contractAddress;
        if (contractAddress) {
          return contractAddress;
        }
      }
    } catch (error) {
      console.log("CreateDonation_error: ", error);
      return;
    }
  };

  // ---- LOGGING THE DONATION IN THE BACKEND ----
  const createDonationBackend = async (
    DONOR_PUBLIC_KEY: string
  ) => {
    // fetch campaign contract address
    let CONTRACT_ADDRESS: string = "";
    if (!campaignContractAddress) {
      if (id) {
        CONTRACT_ADDRESS = await fetchCampaignContractAddress(id);
        console.log("CONTRACT_ADDRESS_FETCHED_AGAIN");
      }
    } else {
      CONTRACT_ADDRESS = campaignContractAddress;
      console.log("USING_ADDRESS_STORED_IN_STATE");
    }

    if (CONTRACT_ADDRESS !== "") {
      try {
        console.log("----- UPDATING DONATION IN THE BACKEND -----");
        const res = await donateCampaign(
          CONTRACT_ADDRESS,
          DONOR_PUBLIC_KEY,
          Number(formData.donationAmount)
        );
        console.log(`
          CreateDonation
          createDonationBackend
          res:
          ${res}`);
        if (res.status === 201) {
          setResponse("Donation successful!");
          console.log("DONATION SUCCESSFUL!");
        }
      } catch (error) {
        console.log("CreateDonation_error: ", error);
        return;
      }
    } else {
      setResponse("Campaign Contract Address Not Found.");
    }
  };

  // ----- LISTENING TO THE EVENTS -----
  const listenForCampaignEvent = async (contract: ethers.Contract) => {
    console.log("----- LISTENING TO EVENTS BEING EMITTED -----");
    await contract.on(
      "DonationReceived",
      async (mostRecentDonor, mostRecentDonationAmount, event) => {
        console.log("DonationReceived event triggered: ", {
          mostRecentDonor: mostRecentDonor,
          mostRecentDonationAmount: mostRecentDonationAmount,
          data: event,
        });
        console.log("----- EVENT LISTENING COMPLETED -----");
        await createDonationBackend(
          mostRecentDonor
        );
        console.log("Done!");
      }
    );
  };

  // ----- DONATE TO THE CAMPAIGN ON SEPOLIA TESTNET -----
  const donateCampaignOnChain = async (
    ADDRESS: string,
    DONATION_AMOUNT: number
  ) => {
    // access the contract on chain
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        ADDRESS,
        ABI_CAMPAIGN_SEPOLIA,
        signer
      );

      // donate to the contract
      try {
        const donationAmount: string = String(DONATION_AMOUNT);
        const gasEstimate = await contract.donate.estimateGas({
          value: ethers.parseEther(donationAmount),
        });
        console.log("gasEstimate: ", gasEstimate);

        if (!gasEstimate) {
          console.log("gasEstimate not found: ");
          return;
        }

        const feeData = await provider.getFeeData();
        console.log("FeeData: ", feeData);
        const gasPrice = feeData.gasPrice;
        console.log("GasPrice: ", gasPrice);

        console.log("----- DONATING CAMPAIGN ON SEPOLIA TESTNET -----");
        const transactionResponse = await contract.donate({
          value: ethers.parseEther(donationAmount)
        });

        console.log("Transaction Response: ", transactionResponse);
        await listenForCampaignEvent(contract);
      } catch (error: any) {
        console.log("Error: ", error);
        setResponse(error.code);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // donation logic

    console.log("formData.donationAmount: ", formData.donationAmount);
    // fetch campaign contract address
    let campaignContractAddress: string = "";
    if (id) {
      campaignContractAddress = await fetchCampaignContractAddress(id);
      setCampaignContractAddress(campaignContractAddress);
    }
    console.log(
      `CreateDonation: campaignContractAddress:${campaignContractAddress}`
    );

    // donate to the campaign on chain and listen for events emitted
    if (campaignContractAddress) {
      await donateCampaignOnChain(
        campaignContractAddress,
        formData.donationAmount
      );
    }
  };

  useEffect(() => {
    const tokenExists = sessionStorage.getItem("x-auth-token");
    console.log("Login: isLoggedIn: ", isLoggedIn);

    if (tokenExists && isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setResponse("Please log in.");
    }

    if (id) {
      setCampaignId(campaignId);
    }
    console.log(id);
  }, []);

  const fields = [
    {
      label: "Donation Amount",
      name: "donationAmount",
      type: "integer",
      required: true,
    },
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
          formTitle="Donate to the Campaign"
          buttonName="Donate"
          onSubmit={handleSubmit}
          onChange={handleChange}
          response={response}
          fields={fields}
        />
      )}
    </div>
  );
};

export default DonateCampaign;