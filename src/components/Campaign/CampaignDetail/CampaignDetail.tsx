import { useEffect, useState } from "react";
import { campaignById} from "../../../API/useractions";
import { Campaign} from "../../../interfaces/campaignInterfaces";
import CampaignDetailStyles from "./CampaignDetailStyles";
import { useParams } from "react-router-dom";

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
      donationsById: campaign.donations,
    });
  };

  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<any>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams<string>();

  const handleChange = async () => {
    try {
      if(campaignId) {
        const res = await campaignById(campaignId);
        console.log("CampaignDetail: res: ", res);
        console.log("CampaignDetail: res.data.campaign: ", res.data.campaign);
        updateCampaignState(res.data.campaign);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("CampaignDetail_error: ", error);
    }
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
    console.log("campaign.campaignState: ", campaign.campaignState);
    console.log("campaign.donationsById", campaign.donationsById);
  }, [campaign]);

  return (
    <>
      <div>
        <h1>Campaign Detail</h1>
        {!isLoading && (
          <CampaignDetailStyles campaign={campaign} isLoading={isLoading} />
        )}
      </div>
    </>
  );
};

export default CampaignDetail;

/*
{
  "campaign": {
      "_id": "66a37271d77aef7489da247c",
      "contractAddress": "0xbc1615972af72d8f2f856967aec76d1e5856fff9",
      "owner": "66a37271d77aef7489da247a",
      "title": "Campaign One",
      "description": "This is a new test campaign. I am testing in development.",
      "goalAmount": 50,
      "currentAmount": 50,
      "finalAmount": 0,
      "campaignState": "active",
      "tags": [
          "new",
          "test",
          "demo"
      ],
      "donors": [
          "66a37309d77aef7489da2484",
          "66a3736bd77aef7489da248f"
      ],
      "donations": [
          {
              "_id": "66a37309d77aef7489da2486",
              "donor": "66a37309d77aef7489da2484",
              "campaign": "66a37271d77aef7489da247c",
              "donationAmount": 25,
              "createdAt": "2024-07-26T09:57:29.419Z",
              "updatedAt": "2024-07-26T09:57:29.419Z",
              "__v": 0
          },
          {
              "_id": "66a3736bd77aef7489da2491",
              "donor": "66a3736bd77aef7489da248f",
              "campaign": "66a37271d77aef7489da247c",
              "donationAmount": 25,
              "createdAt": "2024-07-26T09:59:07.679Z",
              "updatedAt": "2024-07-26T09:59:07.679Z",
              "__v": 0
          }
      ],
      "createdAt": "2024-07-26T09:54:57.672Z",
      "updatedAt": "2024-07-26T09:59:07.744Z",
      "__v": 2
  },
  "donations": [
      {
          "_id": "66a37309d77aef7489da2486",
          "donor": "66a37309d77aef7489da2484",
          "campaign": "66a37271d77aef7489da247c",
          "donationAmount": 25,
          "createdAt": "2024-07-26T09:57:29.419Z",
          "updatedAt": "2024-07-26T09:57:29.419Z",
          "__v": 0
      },
      {
          "_id": "66a3736bd77aef7489da2491",
          "donor": "66a3736bd77aef7489da248f",
          "campaign": "66a37271d77aef7489da247c",
          "donationAmount": 25,
          "createdAt": "2024-07-26T09:59:07.679Z",
          "updatedAt": "2024-07-26T09:59:07.679Z",
          "__v": 0
      }
  ]
}
*/
