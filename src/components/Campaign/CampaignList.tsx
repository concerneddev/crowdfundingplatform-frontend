import React from "react";
import { Link } from "react-router-dom";

interface Donation {
  donor: string;
  donationAmount: number;
}

interface CampaignListProps {
  campaigns: {
    id: string;
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

export const CampaignList: React.FC<CampaignListProps> = ({ campaigns }) => {
  return (
    <div className="p-6 bg-background min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl w-full">
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className="relative bg-card text-textPrimary shadow-md rounded-lg overflow-hidden"
            style={{ paddingTop: '56.25%' }} // 16:9 Aspect Ratio
          >
            <Link to={`/campaign/${campaign.id}`}>
              <div className="absolute inset-0 p-4 flex flex-col justify-between bg-black bg-opacity-60">
                <h2 className="text-lg font-sans font-extrabold text-primary mb-2 hover:text-hoverPrimary transition-colors">
                  {campaign.title}
                </h2>
                <p className="text-base font-body">
                  <strong className="font-semibold">Donation Amount: </strong>
                  {campaign.currentAmount} ETH
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
