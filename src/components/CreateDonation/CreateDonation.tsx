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
import { useNavigate, useParams } from "react-router-dom";
import useConnectWeb3 from "../../web3/useConnectWeb3/useConnectWeb3";

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
  const [campaignContractAddress, setCampaignContractAddress] =
    useState<string>();

  const { id } = useParams<string>();
  const { signer, connectedToMetamask, connectToMetamask } = useConnectWeb3();
  const navigate = useNavigate();

  // ----- Handle Donation Form -----
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
    DONOR_PUBLIC_KEY: string,
    DONATION_AMOUNT: number
  ) => {
    // fetch campaign contract address
    console.log(
      "createDonationBackend params: ",
      DONOR_PUBLIC_KEY,
      DONATION_AMOUNT
    );
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
          DONATION_AMOUNT
        );
        console.log(`
          CreateDonation
          createDonationBackend
          res:
          ${res}`);
        if (res.status === 201) {
          setResponse("Donation successful!");
          console.log("DONATION SUCCESSFUL!");
          navigate(`/campaign/${id}`)
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
        // mostRecentDonationAmount: 10000000000000000n
        // ethers.formatEther(BigInt(mostRecentDonationAmount)) === 0.01
        const donationAmount = ethers.formatEther(
          BigInt(mostRecentDonationAmount)
        );
        console.log("Formatted BigNumber: ", donationAmount);
        await createDonationBackend(mostRecentDonor, Number(donationAmount));
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
          value: ethers.parseEther(donationAmount),
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
    <div className="flex flex-col justify-center items-center h-[400px] mx-auto">
      {!connectedToMetamask ? (
        <div>
          <button
            onClick={() => connectToMetamask()}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
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
