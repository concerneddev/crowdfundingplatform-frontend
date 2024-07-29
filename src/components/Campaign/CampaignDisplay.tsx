import React from "react";

interface Donation {
  donor: string;
  donationAmount: number;
}

interface CampaignDisplayProps {
  campaigns: {
    title: string;
    description: string;
    goalAmount: number;
    currentAmount: number;
    finalAmount: number | null;
    campaignState: string;
    tags: string[];
    donations: Donation[];
  }[];
}

export const CampaignDisplay: React.FC<CampaignDisplayProps> = ({
  campaigns,
}) => {
  return (
    <>
      {campaigns.map((campaign, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 mt-4 mb-4 max-w-sm mx-auto"
        >
          <h2 className="text-xl font-bold mb-2">{campaign.title}</h2>
          <p className="mb-1">
            <strong>Description: </strong>
            {campaign.description}
          </p>
          <p className="mb-1">
            <strong>Goal Amount: </strong>
            {campaign.goalAmount} ETH
          </p>
          <p className="mb-1">
            <strong>Amount: </strong>
            {campaign.campaignState === "inactive"
              ? campaign.finalAmount !== null
                ? campaign.finalAmount
                : "N/A"
              : campaign.currentAmount}{" "}
            ETH
          </p>
          <p className="mb-1">
            <strong>Campaign State: </strong>
            {campaign.campaignState}
          </p>
          <p className="mb-1">
            <strong>Tags: </strong>
            <ul className="list-disc pl-5">
              {campaign.tags.map((tag, index) => (
                <li
                  key={index}
                  className=""
                >
                  {tag}
                </li>
              ))}
            </ul>
          </p>
          <p className="mb-1">
            <strong>Donations: </strong>
            {campaign.donations.length}
          </p>
        </div>
      ))}
    </>
  );
};
