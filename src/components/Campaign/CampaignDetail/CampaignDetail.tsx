import { useEffect, useState } from "react";
import { campaignById } from "../../../API/useractions";
import { Campaign } from "../../../interfaces/campaignInterfaces";
import CampaignDetailStyles from "./CampaignDetailStyles";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Button";
import useWithdraw from "../../../web3/useWithdraw/useWithdraw";

const CampaignDetail = () => {
  const initialState = {
    id: "",
    contractAddress: "",
    owner: "",
    title: "",
    description: "",
    goalAmount: 0,
    currentAmount: 0,
    finalAmount: 0,
    campaignState: "",
    tags: [],
    image: "",
    donors: [],
    donationsById: [],
  };

  const updateCampaignState = (campaign: Campaign) => {
    setCampaign({
      id: campaign._id,
      contractAddress: campaign.contractAddress,
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      goalAmount: campaign.goalAmount,
      currentAmount: campaign.currentAmount,
      finalAmount: campaign.finalAmount,
      campaignState: campaign.campaignState,
      tags: campaign.tags,
      image: campaign.image,
      donationsById: campaign.donations,
    });
  };

  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<any>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [ownerId, setOwnerId] = useState<string>("");
  const [campaignIsActive, setCampaignIsActive] = useState<boolean>(false);
  const { id } = useParams<string>();
  const [contractAddress, setContractAddress] = useState<string>("");
  const navigate = useNavigate();
  const { withdraw } = useWithdraw(contractAddress);

  const handleChange = async () => {
    try {
      if (campaignId) {
        const res = await campaignById(campaignId);
        console.log("CampaignDetail: res: ", res);
        const ownerId = res.data.campaign.owner.ownerData;
        setOwnerId(ownerId);
        updateCampaignState(res.data.campaign);
        setContractAddress(res.data.campaign.contractAddress);
        if (res.data.campaign.campaignState === "active") {
          setCampaignIsActive(true);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log("CampaignDetail_error: ", error);
    }
  };

  // ----- ONCLICK LOGIC FOR DONATE -----
  const handleDonateClick = () => {
    navigate(`/donatecampaign/${id}`);
  };

  useEffect(() => {
    const campaignId = id;
    if (campaignId) {
      setCampaignId(campaignId);
    }

    console.log("Campaign_Detail: campaignId:", campaignId);
    handleChange();
    console.log("campaign: ", campaign);
  }, [campaignId]);

  useEffect(() => {
    console.log("campaign: ", campaign);
  }, [campaign]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (ownerId === userId) {
      setIsOwner(true);
    }
  }, [ownerId]);

  return (
    <>
      <div className="">
        {!isLoading ? (
          <div className="mt-10">
            <CampaignDetailStyles campaign={campaign} isLoading={isLoading} />

            {campaignIsActive ? (
              <>
                <Button label="Donate" onClick={handleDonateClick} />
                {isOwner && <Button label="Withdraw" onClick={withdraw} />}
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center p-6">
                <p className="text-xl text-gray-400">Campaign closed.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center p-6">
            <p className="text-xl text-gray-400">Loading...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CampaignDetail;

/*
{
    "_id": "66b887ae6da44b8f7cda3428",
    "contractAddress": "0x12f5E1eebF49f28EF8633e4d50110140d5E46b36",
    "owner": {
        "_id": "66b8619c9f22f92be5d7cb6d",
        "publicKey": "0x518EDf622626C876D894eF4E9F31CCA936C8A8F8",
        "ownerData": "66b85484ee365b693826cc2b",
        "campaigns": [
            "66b8619c9f22f92be5d7cb70",
            "66b862279f22f92be5d7cb77",
            "66b862479f22f92be5d7cb81",
            "66b887ae6da44b8f7cda3428",
            "66b893db6da44b8f7cda343d"
        ],
        "createdAt": "2024-08-11T07:00:44.618Z",
        "updatedAt": "2024-08-11T10:35:08.030Z",
        "__v": 5
    },
    "title": "Campaign With Image",
    "description": "Campaign With Image",
    "goalAmount": 0.01,
    "currentAmount": 0,
    "finalAmount": 0,
    "campaignState": "active",
    "tags": [
        "sepolia",
        "test"
    ],
    "image": "http://localhost:5555/uploads/campaigns/1723369388518.jpg",
    "donors": [],
    "donations": [],
    "createdAt": "2024-08-11T09:43:10.273Z",
    "updatedAt": "2024-08-11T09:43:10.273Z",
    "__v": 0
}
*/
