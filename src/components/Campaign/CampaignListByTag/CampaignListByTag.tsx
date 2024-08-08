import { useEffect, useState } from "react";
import { campaignsByTag } from "../../../API/useractions";
import { Campaign } from "../../../interfaces/campaignInterfaces";
import { CampaignList } from "../CampaignList";
import { useParams } from "react-router-dom";

const CampaignListByTag = () => {
  const updateCampaigns = (incomingCampaigns: Campaign[]) => {
    console.log("updateCampaigns: param: ", incomingCampaigns);
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

  const [campaignTag, setCampaignTag] = useState<string>("");
  const { tag } = useParams<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allCampaigns, setCampaigns] = useState<any>({
    campaigns: [
      {
        id: "",
        title: "",
        description: "",
        goalAmount: 0,
        currentAmount: 0,
        finalAmount: 0,
        campaignState: "",
        tags: [],
        donations: [],
      },
    ],
  });

  const handleChange = async (_tag: string) => {
    try {
      const res = await campaignsByTag(_tag);
      console.log("CampaignListByTag: res", res);
      const campaigns = res.data.campaigns;
      updateCampaigns(campaigns);
      setIsLoading(false);
    } catch (error) {
      console.log("CampaignListByTag_error: ", error);
    }
  };

  // set campaignTag state on mount
  useEffect(() => {
    if (tag) {
      console.log(tag);
      setCampaignTag(tag);
    }
  }, []);

  // on setting campaignTag state handleChange()
  useEffect(() => {
    handleChange(campaignTag);
  }, [campaignTag])

  useEffect(() => {
    console.log("Campaigns: ", allCampaigns);
    console.log(
      "allCampaigns.campaigns[0].title",
      allCampaigns.campaigns[0].title
    );
  }, [isLoading]);

  return (
    <>
      <div>
        <h1>Campaigs By Tags</h1>
        {!isLoading && (
          <div>
            <CampaignList campaigns={allCampaigns.campaigns} />
          </div>
        )}
      </div>
    </>
  );
};

export default CampaignListByTag;