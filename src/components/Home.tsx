import { useState, useEffect } from "react";
import { Campaign } from "../interfaces/campaignInterfaces";
import { campaignsRecent } from "../API/useractions";
import { CampaignList } from "./Campaign/CampaignList";

const Home = () => {
  const updateCampaigns = (incomingCampaigns: Campaign[]) => {
    setCampaigns((currentCampaigns: Campaign[]) => {
      const updatedCampaigns = incomingCampaigns.map((campaign) => ({
        id: campaign._id,
        title: campaign.title,
        description: campaign.description,
        goalAmount: campaign.goalAmount,
        currentAmount: campaign.currentAmount,
        finalAmount: campaign.finalAmount,
        campaignState: campaign.campaignState,
        tags: campaign.tags,
        donations: campaign.donations.map((donation) => ({
          donor: donation.donor,
          campaign: donation.campaign,
          donationAmount: donation.donationAmount,
        })),
      }));

      return {
        ...currentCampaigns,
        campaigns: [...updatedCampaigns],
      };
    });
  };

  const [response, setResponse] = useState<string>("");
  const [allCampaigns, setCampaigns] = useState<any>({
    campaigns: [{
        id: "",
        title: "",
        description: "",
        goalAmount: 0,
        currentAmount: 0,
        finalAmount: 0,
        campaignState: "",
        tags: [],
        donations: []
    }],

  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChange = async () => {
    try {
      const res = await campaignsRecent();
      console.log("res: ", res.data);
      const campaigns = res.data; // array of campaigns
      updateCampaigns(campaigns);

      if (res.status === 201) {
        setResponse("Fetched Successfully!");
      }

      setIsLoading(false);
    } catch (error: any) {
      console.log("Error: ", error);
      if (error.status === 401) {
        setResponse("Access Denied!");
      }
    }
  };

  useEffect(() => {
    handleChange();
  }, []);

  useEffect(() => {
    console.log("Campaigns: ", allCampaigns);
    console.log("allCampaigns.campaigns[0].title", (allCampaigns.campaigns[0]).title);
  }, [allCampaigns]);

  return (
    <>
      <div>
        <CampaignList campaigns={allCampaigns.campaigns} />
      </div>
    </>
  );
};

export default Home;
