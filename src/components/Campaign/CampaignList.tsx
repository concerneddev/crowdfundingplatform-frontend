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
    image: string;
    donations: Donation[];
  }[];
}

export const CampaignList: React.FC<CampaignListProps> = ({ campaigns }) => {
  return (
    <div className="pt-1 bg-background min-h-screen flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 max-w-5xl w-full">
        {campaigns.map((campaign) => (
          <Link
            key={campaign.id}
            to={`/campaign/${campaign.id}`}
            className="p-2 rounded-lg hover:shadow-xl transition-shadow duration-200 relative"
          >
            <div className="relative">
              <div className="absolute top-2 right-2 ">
                {campaign.campaignState !== "active" ? (
                  <div className="bg-red-600 bg-opacity-80 text-white text-xs px-2 py-1 rounded-full">
                    Campaign Closed
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                {campaign.donations.length}{" "}
                {campaign.donations.length === 1 ? "Donation" : "Donations"}
              </div>
            </div>
            <div className="mt-1">
              <h2 className="text-l text-black font-bold">{campaign.title}</h2>
              <p className="text-black mt-1">
                {campaign.campaignState === "active" ? (
                  <>{campaign.currentAmount} ETH raised</>
                ) : (
                  <>{campaign.finalAmount} ETH raised</>
                )}
              </p>
              <div className="relative w-full bg-gray-200 h-1 mt-2">
                {campaign.campaignState === "active" ? (
                  <div
                    className="absolute top-0 left-0 h-full bg-black"
                    style={{
                      width: `${
                        (Number(campaign.currentAmount) / campaign.goalAmount) *
                        100
                      }%`,
                    }}
                  ></div>
                ) : (
                  <div
                    className="absolute top-0 left-0 h-full bg-black"
                    style={{
                      width: `${
                        (Number(campaign.finalAmount) / campaign.goalAmount) *
                        100
                      }%`,
                    }}
                  ></div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
