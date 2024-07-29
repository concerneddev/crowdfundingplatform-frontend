export interface Donation {
    _id: string;
    donor: string;
    campaign: string;
    donationAmount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Campaign {
    _id: string;
    contractAddress: string;
    owner: string;
    title: string;
    description: string;
    goalAmount: number;
    currentAmount: number;
    finalAmount: number;
    campaignState: string;
    tags: string[];
    donors: string[];
    donations: Donation[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface AllCampaignsState {
    campaigns: Campaign[];
}
