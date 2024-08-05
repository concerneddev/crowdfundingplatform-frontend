import { useState, useEffect } from "react";
import { profile } from "../../API/useractions";
import UserProfile from "../UserProfile";
import { Campaign } from "../../interfaces/campaignInterfaces";
import { CampaignList } from "../Campaign/CampaignList";

const MyProfile = () => {
  const initialProfileState = {
    username: "",
    role: "",
    publicKey: "",
  };

  const updateProfile = (username: string, role: any, publicKey: string) => {
    if (role.includes("owner")) {
      role = "owner";
    } else if (role.includes("donor")) {
      role = "donor";
    } else {
      role = "user";
    }
    setUserProfile({
      username: username,
      role: role,
      publicKey: publicKey,
    });
  };

  const updateCampaigns = (incomingCampaigns: Campaign[]) => {
    const validCampaigns = incomingCampaigns.filter(
      (campaign: any) => typeof campaign === "object" && campaign._id
    );

    setCampaigns((currentCampaigns: Campaign[]) => {
      const updatedCampaigns = validCampaigns.map((campaign) => ({
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

  const [response, setResponse] = useState<string>("");
  const [userprofile, setUserProfile] = useState<any>(initialProfileState);
  const [allCampaigns, setCampaigns] = useState<any>({
    campaigns: [],
  });

  const handleChange = async () => {
    try {
      const res = await profile();
      console.log("res.data: ", res.data);
      // upate userprofile state
      updateProfile(
        res.data.user.username,
        res.data.user.role,
        res.data.publicKey
      );

      const campaigns = res.data.campaigns || [];

      // Check if the incomingCampaigns is an array and handle empty or invalid entries
      if (
        !Array.isArray(campaigns) ||
        campaigns.length === 0 ||
        (campaigns.length === 1 && campaigns[0] === "")
      ) {
        setCampaigns({ campaigns: [] });
      }

      updateCampaigns(campaigns);

      if (res.status === 201) {
        setResponse("Fetched Successfully!");
      }
    } catch (error: any) {
      console.error(error.status);
      if (error.status === 401) {
        setResponse("Access Denied!");
      }
    }
  };

  useEffect(() => {
    handleChange();
  }, []);

  // profile updated?
  useEffect(() => {
    console.log("Updated Profile: ", userprofile);
  }, [userprofile]);

  useEffect(() => {
    console.log("Campaigns: ", allCampaigns);
  }, [allCampaigns]);

  return (
    <>
      <div>
        <h1>Profile</h1>
        <UserProfile
          username={userprofile.username}
          role={userprofile.role}
          publicKey={userprofile.publicKey}
        />
        <CampaignList campaigns={allCampaigns.campaigns} />
      </div>
    </>
  );
};

export default MyProfile;

/*

{
    "user": {
        "_id": "66a37174d77aef7489da246f",
        "username": "ownerOne",
        "password": "$2a$10$vYrYvPpDrDjgYun75TGpd./wdITcZFjxDmese0yBC/utvWhFIeEvu",
        "role": [
            "user",
            "owner"
        ],
        "createdAt": "2024-07-26T09:50:44.974Z",
        "updatedAt": "2024-07-26T09:54:57.709Z",
        "__v": 1
    },
    "ownerPublicKey": "0x518EDf622626C876D894eF4E9F31CCA936C8A8F7",
    "campaigns": [
        {
            "_id": "66a37271d77aef7489da247c",
            "contractAddress": "0xbc1615972af72d8f2f856967aec76d1e5856fff9",
            "owner": "66a37271d77aef7489da247a",
            "title": "Campaign One",
            "description": "This is a new test campaign. I am testing in development.",
            "goalAmount": 50,
            "currentAmount": 50,
            "finalAmount": 0,
            "campaignState": "active",
            "tags": [
                "new",
                "test",
                "demo"
            ],
            "donors": [
                "66a37309d77aef7489da2484",
                "66a3736bd77aef7489da248f"
            ],
            "donations": [
                {
                    "_id": "66a37309d77aef7489da2486",
                    "donor": "66a37309d77aef7489da2484",
                    "campaign": "66a37271d77aef7489da247c",
                    "donationAmount": 25,
                    "createdAt": "2024-07-26T09:57:29.419Z",
                    "updatedAt": "2024-07-26T09:57:29.419Z",
                    "__v": 0
                },
                {
                    "_id": "66a3736bd77aef7489da2491",
                    "donor": "66a3736bd77aef7489da248f",
                    "campaign": "66a37271d77aef7489da247c",
                    "donationAmount": 25,
                    "createdAt": "2024-07-26T09:59:07.679Z",
                    "updatedAt": "2024-07-26T09:59:07.679Z",
                    "__v": 0
                }
            ],
            "createdAt": "2024-07-26T09:54:57.672Z",
            "updatedAt": "2024-07-26T09:59:07.744Z",
            "__v": 2
        }
    ]
}
*/
