import React from "react";
import DonationList from "../../Donation/DonationList";

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
        ? `${campaign.finalAmount} ETH`
        : "N/A"
      : `${campaign.currentAmount} ETH`;

  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 mt-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-extrabold text-[#39ff14] mb-6">
        {campaign.title}
      </h2>
      <p className="mb-3">
        <strong className="font-semibold">Description:</strong> {campaign.description}
      </p>
      <p className="mb-3">
        <strong className="font-semibold">Goal Amount:</strong> {campaign.goalAmount} ETH
      </p>
      <p className="mb-3">
        <strong className="font-semibold">Amount:</strong> {displayAmount}
      </p>
      <p className="mb-3">
        <strong className="font-semibold">Campaign State:</strong> {campaign.campaignState}
      </p>
      <p className="mb-3">
        <strong className="font-semibold">Tags:</strong> {campaign.tags.map((tag) => tag).join(", ")}
      </p>
      <h3 className="text-2xl font-semibold mt-6 mb-4">
        <strong>Donations:</strong>
      </h3>
      <ul>
        {!isLoading && <DonationList donationsById={campaign.donationsById} />}
      </ul>
    </div>
  );
};

export default CampaignDetailStyles;
