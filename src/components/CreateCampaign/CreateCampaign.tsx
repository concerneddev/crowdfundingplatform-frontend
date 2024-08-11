import React, { useContext, useState, useEffect } from "react";
import CreateCampaignForm from "./CreateCampaignForm";
import { GlobalStateContext } from "../../contexts/GlobalStateProvider";
import useConnectWeb3 from "../../web3/useConnectWeb3/useConnectWeb3";
import useCreateCampaign from "../../web3/useCreate/useCreateCampaign";
import placeHolderImage from "../../SVG/default-image.jpg";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import LogoIcon from "../LogoIcon";

interface CampaignData {
  contractAddress: string;
  ownerPublicKey: string;
  title: string;
  description: string;
  goalAmount: number;
  tags: string[];
  image: File;
}

const CreateCampaign: React.FC = () => {
  const [formData, setFormData] = useState<CampaignData>({
    contractAddress: "",
    ownerPublicKey: "",
    title: "",
    description: "",
    goalAmount: 0,
    tags: [],
    image: new File([""], "placeHolderImage"),
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalStateContext);
  const { signer, connectedToMetamask, connectToMetamask } = useConnectWeb3();
  const { response, create } = useCreateCampaign({
    SIGNER: signer,
    CAMPAIGN_TITLE: formData.title,
    CAMPAIGN_DESCRIPTION: formData.description,
    CAMPAIGN_GOAL_AMOUNT: formData.goalAmount,
    CAMPAIGN_TAGS: formData.tags,
    CAMPAIGN_IMAGE: formData.image,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, files } = event.target;

    if (type === "file") {
      if (files && files.length > 0) {
        setFormData((prevState) => ({
          ...prevState,
          image: files[0],
        }));
      }
    } else {
      if (name === "tags") {
        const trimmedTags = value.split(",").map((tag) => tag.trim());
        setFormData({ ...formData, [name]: trimmedTags });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    await create();
  };

  useEffect(() => {
    const tokenExists = sessionStorage.getItem("x-auth-token");
    console.log("Login: isLoggedIn: ", isLoggedIn);

    if (tokenExists && !isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    setShowLoader(true);
  }, [submitted]);

  useEffect(() => {
    setShowLoader(false);
  }, [response]);

  const fields = [
    {
      label: "Campaign Title",
      name: "title",
      type: "text",
      placeholder: "Campaign Title",
      required: true,
    },
    {
      label: "Campaign Description",
      name: "description",
      type: "textarea",
      placeholder: "Description",
      required: true,
    },
    {
      label: "Goal Amount",
      name: "goalAmount",
      type: "integer",
      placeholder: "Goal Amount",
      required: true,
    },
    {
      label: "Tags (Comma-separated)",
      name: "tags",
      type: "text",
      placeholder: "Tags (Comma-separated)",
      required: false,
    },
    {
      label: "Upload Image",
      name: "image",
      type: "file",
      required: false,
      isFileInput: true,
    },
  ];

  const handleRedirect = () => {
    return (
      <div className="">
        {!connectedToMetamask ? (
          <div className="flex justify-center items-center bg-white px-40">
            <div>
              <button
                onClick={() => connectToMetamask()}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4"
              >
                Connect to MetaMask
              </button>
            </div>
          </div>
        ) : (
          <CreateCampaignForm
            formTitle="Your Campaign Details"
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

  return (
    <div className="flex h-screen">
      {/* Left Pane */}
      <div className="flex flex-col items-center bg-headerBg px-[180px]">
        <div className="flex flex-col items-center py-[50px]">
          <div className=" py-[80px]">
          <Link to="/home">
            <LogoIcon />
          </Link>
          </div>
          
          <div>
            <div className="flex flex-col items-center">
              <h3>Fundraise Now</h3>
            </div>
            <div className="max-w-sm mx-auto text-center">
              <h2 className="text-5xl font-semibold text-primary mb-6">
                Create
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane */}
      <div>
        {!showLoader ? (
          <div className="flex items-center gap-[60px] bg-white px-40 mt-[140px]">
            <div>{handleRedirect()}</div>
          </div>
        ) : (
          <div className="flex items-center justify-center px-[400px] py-[250px]">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCampaign;
