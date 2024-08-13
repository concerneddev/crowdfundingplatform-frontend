import React from "react";
import DonationList from "../../Donation/DonationList";
import { useNavigate } from "react-router-dom";
import CampaignDetailButton from "./CampaignDetailButton";
import useWithdraw from "../../../web3/useWithdraw/useWithdraw";

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
    image: string;
    donors?: string[];
    donationsById: string[];
    createdAt: string;
  };
  isLoading: boolean;
  id: string;
  campaignIsActive: boolean;
  isOwner: boolean;
  campaignUsername: string;
}

const CampaignDetailStyles: React.FC<CampaignDetailProps> = ({
  campaign,
  isLoading,
  id,
  campaignIsActive,
  isOwner,
  campaignUsername,
}) => {
  const { withdraw } = useWithdraw(campaign.contractAddress);
  const navigate = useNavigate();

  // Determine which amount to display based on the campaign state
  const displayAmount =
    campaign.campaignState === "inactive"
      ? campaign.finalAmount !== undefined
        ? `${campaign.finalAmount}`
        : "N/A"
      : `${campaign.currentAmount}`;

  const createdAt = new Date(campaign.createdAt);
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleDonateClick = () => {
    navigate(`/donatecampaign/${id}`);
  };

  return (
    <>
      {/* Outer card */}
      <div className="bg-white text-white w-[1200px] mx-auto flex">
        {/* Left Pane */}
        <div className="flex flex-col items-center w-[1000px]">
          <div className="w-full max-w-[720px]">
            <p className="text-2xl text-black font-bold mb-4 text-left">
              {campaign.title}
            </p>
          </div>

          <div className="w-full max-w-[720px] flex justify-center mb-2">
            <img
              src={campaign.image}
              alt="Campaign"
              className="w-full h-auto max-h-[405px] object-cover rounded-lg"
            />
          </div>

          <div className="w-full max-w-[720px]">
            <p
              className="text-base text-black mt-3 pt-2 leading-relaxed whitespace-pre-wrap text-left
    border-t border-gray-400"
            >
              {campaignUsername}
            </p>

            <p className="text-sm text-gray-600">
              {formattedDate}
            </p>
          </div>

          <div className="w-full max-w-[720px]">
            <p
              className="text-base text-black mt-2 pt-2 pb-2 leading-relaxed whitespace-pre-wrap text-left
            border-t border-gray-400 "
            >
              {campaign.description}
            </p>
          </div>

          <div className="w-full max-w-[720px] border-t border-b border-gray-400 py-2">
            <p className="text-black">
              {campaign.tags.map((tag) => tag).join(", ")}
            </p>
          </div>

          {/* Footer */}
          <footer className="w-full max-w-[720px] p-4 mt-4">
            {/* Footer content goes here */}
          </footer>
        </div>

        {/* Right Pane */}
        <div className="flex flex-col w-[350px] ">
          <div className="border shadow-xl pl-2 pr-2 pb-2 rounded-xl">
            <div className="w-full max-w-[720px] p-2">
              <p className="text-black mb-2">
                {displayAmount} ETH raised of {campaign.goalAmount} ETH goal
              </p>

              <div className="relative w-full bg-gray-200 h-1">
                <div
                  className="absolute top-0 left-0 h-full bg-black"
                  style={{
                    width: `${
                      (Number(displayAmount) / campaign.goalAmount) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div>
                <p className="text-xs text-black mt-1 mb-1">
                  {campaign.donationsById.length} Donations
                </p>
              </div>
            </div>

            <div className="w-full">
              {campaignIsActive ? (
                <>
                  <div className="w-full mb-2">
                    <CampaignDetailButton
                      label="Donate"
                      onClick={handleDonateClick}
                    />
                  </div>
                  {isOwner && (
                    <div className="w-full">
                      <CampaignDetailButton
                        label="Withdraw"
                        onClick={withdraw}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center p-6">
                  <p className="text-xl text-gray-400">Campaign closed.</p>
                </div>
              )}
            </div>

            <div>
              {!isLoading && (
                <DonationList donationsById={campaign.donationsById} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="bg-gray-800 text-white shadow-lg rounded-lg p-8 mt-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-extrabold text-[#39ff14] mb-6">
        {campaign.title}
      </h2>

      <p className="mb-3">
        <strong className="font-semibold">Image:</strong>
        <img
          src={campaign.image}
          alt="Campaign"
          className="mt-2 w-[720px] h-[405px] object-cover"
        />
      </p>

      <p className="mb-3">
        <strong className="font-semibold">Goal Amount:</strong>{" "}
        {campaign.goalAmount} ETH
      </p>
      <p className="mb-3">
        <strong className="font-semibold">Amount:</strong> {displayAmount}
      </p>
      <p className="mb-3">
        <strong className="font-semibold">Campaign State:</strong>{" "}
        {campaign.campaignState}
      </p>
      <p className="mb-3">
        <strong className="font-semibold">Tags:</strong>{" "}
        {campaign.tags.map((tag) => tag).join(", ")}
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
