import React from "react";

interface Tag {
    label?: string;
}

interface Donation {
    donor: string;
    donationAmount: number;
}

interface CampaignDetailProps {
    campaign: {
        contractAddress: string;
        owner: string;
        title: string;
        description: string;
        goalAmount: number;
        currentAmount: number;
        finalAmount?: number; // Note that finalAmount is optional
        campaignState: string;
        tags: Tag[];
        donations: Donation[];
    };
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaign }) => {
    // Determine which amount to display based on the campaign state
    const displayAmount = campaign.campaignState === "inactive" ? 
                          (campaign.finalAmount !== undefined ? `$${campaign.finalAmount}` : 'N/A') :
                          `$${campaign.currentAmount}`;

    return (
      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <h2 className="text-xl font-bold mb-4">{campaign.title}</h2>
        <p><strong>Description:</strong> {campaign.description}</p>
        <p><strong>Goal Amount:</strong> ${campaign.goalAmount}</p>
        <p><strong>Amount:</strong> {displayAmount}</p> {/* Changed Current Amount to Display Amount */}
        <p><strong>Campaign State:</strong> {campaign.campaignState}</p>
        <p><strong>Tags:</strong> {campaign.tags.map(tag => tag?.label).join(', ')}</p> {/* Fixed tags mapping */}
        
        <h3 className="mt-4"><strong>Donations:</strong></h3>
        <ul>
          {campaign.donations.map((donation, index) => (
            <li key={index}>
              <p><strong>Donor:</strong> {donation.donor}</p>
              <p><strong>Donation Amount:</strong> ${donation.donationAmount}</p>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default CampaignDetail;
