import React from "react";
import DonationList from "../../Donation/DonationList";

/*
interface Tag {
  label?: string;
}
*/
interface CampaignDetailProps {
  campaign: {
    id: string;
    contractAddress: string;
    owner: string;
    title: string;
    description: string;
    goalAmount: number;
    currentAmount: number;
    finalAmount: number;
    campaignState: string;
    tags: string[];
    donors?: string[];
    donationsById: string[];
  },
  isLoading: boolean;
}

const CampaignDetailStyles: React.FC<CampaignDetailProps> = ({ campaign, isLoading }) => {
  // Determine which amount to display based on the campaign state
  const displayAmount =
    campaign.campaignState === "inactive"
      ? campaign.finalAmount !== undefined
        ? `$${campaign.finalAmount}`
        : "N/A"
      : `$${campaign.currentAmount}`;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-xl font-bold mb-4">{campaign.title}</h2>
      <p>
        <strong>Description:</strong> {campaign.description}
      </p>
      <p>
        <strong>Goal Amount:</strong> ${campaign.goalAmount}
      </p>
      <p>
        <strong>Amount:</strong> {displayAmount}
      </p>{" "}
      {/* Changed Current Amount to Display Amount */}
      <p>
        <strong>Campaign State:</strong> {campaign.campaignState}
      </p>
      <p>
        <strong>Tags:</strong> {campaign.tags.map((tag) => tag).join(", ")}
      </p>{" "}
      {/* Fixed tags mapping */}
      <h3 className="mt-4">
        <strong>Donations:</strong>
      </h3>
      <ul>
        {!isLoading && <DonationList donationsById = {campaign.donationsById}/>}
      </ul>
    </div>
  );
};

export default CampaignDetailStyles;
