import React, { useContext, useState, useEffect } from "react";
import Form from "../Form";
import { GlobalStateContext } from "../../contexts/GlobalStateProvider";
import useConnectWeb3 from "../../web3/useConnectWeb3/useConnectWeb3";
import useCreateCampaign from "../../web3/useCreate/useCreateCampaign";

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
  const { signer, connectedToMetamask, connectToMetamask } = useConnectWeb3();
  const { response, create } = useCreateCampaign({
    SIGNER: signer,
    CAMPAIGN_TITLE: formData.title,
    CAMPAIGN_DESCRIPTION: formData.description,
    CAMPAIGN_GOAL_AMOUNT: formData.goalAmount,
    CAMPAIGN_TAGS: formData.tags,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "tags") {
      setFormData({ ...formData, [name]: value.split(",").map(tag => tag.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await create();
  };

  useEffect(() => {
    const tokenExists = sessionStorage.getItem("x-auth-token");
    console.log("Login: isLoggedIn: ", isLoggedIn);

    if (tokenExists && !isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

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
      type: "integer",
      required: true,
    },
    { label: "Tags (Comma-separated)", name: "tags", type: "text" },
  ];

  return (
    <div className="container mx-auto">
      {!connectedToMetamask ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <button
            onClick={() => connectToMetamask()}
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
