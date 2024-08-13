// Raw Donation Object returned from API
export interface Donation {
    _id: string;
    donor: string;
    campaign: string;
    donationAmount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// Raw Campaign Object returned from API
interface Owner {
    _id: string;
    publicKey: string;
    ownerData: string;
    campaigns: string[];
    createdAt: string; // ISO 8601 string
    updatedAt: string; // ISO 8601 string
    __v: number;
  }
  
export interface Campaign {
    _id: string;
    contractAddress: string;
    owner: Owner;
    title: string;
    description: string;
    goalAmount: number;
    currentAmount: number;
    finalAmount: number;
    campaignState: string;
    tags: string[];
    image: string;
    donors?: string[];
    donations: Donation[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface AllCampaignsState {
    campaigns: Campaign[];
}
