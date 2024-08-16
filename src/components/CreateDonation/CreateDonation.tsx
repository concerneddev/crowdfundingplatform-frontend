import React, { useContext, useState, useEffect } from "react";
import { campaignById } from "../../API/useractions";
import { GlobalStateContext } from "../../contexts/GlobalStateProvider";
import Form from "../Form";
import { useParams } from "react-router-dom";
import useConnectWeb3 from "../../web3/useConnectWeb3/useConnectWeb3";
import useCreateDonation from "../../web3/useCreate/useCreateDonation";

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
  const [campaignId, setCampaignId] = useState<string>("");
  const [campaignContractAddress, setCampaignContractAddress] =
    useState<string>("");

  const { id } = useParams<string>();
  const { connectedToMetamask, connectToMetamask } = useConnectWeb3();
  const { response, donate } = useCreateDonation({
    CONTRACT_ADDRESS: campaignContractAddress,
    DONATION_AMOUNT: formData.donationAmount,
  });

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

  // ----- Handle Donation Form -----
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCampaignContractAddress = async (campaignId: string) => {
    const campaignContractAddress = await fetchCampaignContractAddress(
      campaignId
    );
    setCampaignContractAddress(campaignContractAddress);
    console.log("Campaign Contract Address handled... ");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // donate to the campaign on chain and listen for events emitted
    if (campaignContractAddress) {
      await donate();
    }
  };

  useEffect(() => {
    const tokenExists = sessionStorage.getItem("x-auth-token");
    console.log("Login: isLoggedIn: ", isLoggedIn);

    if (tokenExists && isLoggedIn) {
      setIsLoggedIn(true);
    } 

    if (id) {
      setCampaignId(campaignId);
      handleCampaignContractAddress(id);
    }
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
