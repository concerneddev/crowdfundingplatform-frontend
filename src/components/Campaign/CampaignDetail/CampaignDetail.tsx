import React, { useEffect, useState } from "react";
import { campaignById } from "../../../API/useractions";
import { Campaign } from "../../../interfaces/campaignInterfaces";

const CampaignDetail = () => {
  interface campaignResponse {
    id: string;
    title: string;
    description: string;
    goalAmount: string;
    currentAmount: string;
    finalAmount: string;
    campaignState: string;
    tags: string[];
    donationsById: string[];
  };

  const updateCampaignState = (campaign: Campaign[]) => {
    setCampaign((currentCampaign: any) => {
      const updatedCampaign = campaign.map((campaign: Campaign) => ({
        id: campaign._id,
        title: campaign.title,
        description: campaign.description,
        goalAmount: campaign.goalAmount,
        currentAmount: campaign.currentAmount,
        finalAmount: campaign.finalAmount,
        campaignState: campaign.campaignState,
        tags: campaign.tags,
        donationsById: campaign.donations,
      }));
      return {
        ...currentCampaign,
        campaign: [...updatedCampaign],
      };
    });
  };

  const [campaignId, setCampaignId] = useState<string | null>("");
  const [campaign, setCampaign] = useState<campaignResponse>();
  const handleChange = async () => {
    try {
      const res = await campaignById(campaignId);
      console.log("res: ", res.data);
      console.log("res.data.campaigns: ", res.data.campaigns[0]);
      updateCampaignState(res.data.campaigns);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const campaignId = params.get("campaignId");
    if (campaignId) {
      setCampaignId(campaignId);
    }
    handleChange();
  }, []);

  useEffect(() => {
    console.log("campaign: ", campaign);
  }, [campaign]);
  return (
    <>
      <div>
        <h1>Campaign Detail</h1>
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
