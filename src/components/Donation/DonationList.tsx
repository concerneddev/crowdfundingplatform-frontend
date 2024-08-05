import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { campaignById, donationById } from "../../API/useractions";

interface DonationListProps {
  donationsById: string[];
}

interface Donation {
  donationId: string; //donation.id
  donorId: string; // donor.donorId
  donor: string; // donor.donorData.username
  donationAmount: number; // donation.donationAmount
  donorPublicKey: string; // donor.publicKey
  campaignId: string; // donation.campaign
}

const DonationList: React.FC<DonationListProps> = ({ donationsById }) => {
  console.log("DonationList Component Reached.");

  const updateDonations = (fetchedDonations: any[]) => {
    const updatedDonations: Donation[] = [];
    for (const fetchedDonation of fetchedDonations) {
      const donationData = fetchedDonation;

      updatedDonations.push({
        donationId: donationData._id,
        donorId: donationData.donor._id,
        donor: donationData.donor.donorData.username,
        donationAmount: donationData.donationAmount,
        donorPublicKey: donationData.donor.publicKey,
        campaignId: donationData.campaign,
      });
    }
    setDonations(updatedDonations);
  };

  const [donations, setDonations] = useState<Donation[]>([
    {
      donationId: "",
      donorId: "",
      donor: "",
      donationAmount: 0,
      donorPublicKey: "",
      campaignId: "",
    },
  ]);
  const [donationsArray, setDonationsArray] = useState<string[]>([]);

  const handleChange = async () => {
    try {
      // array of donation Ids
      // const donationIds: string[] = ["66a3736bd77aef7489da2491", "66a37309d77aef7489da2486"]
      setDonationsArray(donationsById);
      const fetchedDonations: any[] = [];
      console.log("donationsById: ", donationsArray);
      const donationIds: string[] = donationsById.filter(
        (item) => typeof item === "string"
      );
      console.log("donationIds: ", donationIds);
      for (const id of donationIds) {
        const res = await donationById(id);
        console.log("res: ", res.data);
        fetchedDonations.push(res.data.donation);
      }
      updateDonations(fetchedDonations);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    handleChange();
  }, [donationById]);

  useEffect(() => {
    console.log("Updated donations: ", donations);
    console.log("donations[0]", donations[0]);
    //console.log("(donations[0]).campaignId", (donations[0]).campaignId);
  }, [donations]);

  return (
    <div className="overflow-x-auto bg-gray-800 p-6 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700 text-[#39ff14]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Donor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Donation Amount
            </th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {donations.length === 0 ? (
            <tr key="no-donations">
              <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                No donations yet
              </td>
            </tr>
          ) : (
            donations.map((donation, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {donation.donor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {donation.donationAmount} ETH
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonationList;

/*
{
    "donation": {
        "_id": "66a37309d77aef7489da2486",
        "donor": {
            "_id": "66a37309d77aef7489da2484",
            "publicKey": "0xFC5272061F97D5F907C25bC9e7dda26C712Ac803",
            "donorData": {
                "_id": "66a37185d77aef7489da2472",
                "username": "donorOne",
                "password": "$2a$10$5B9x7g875FA3WPVebwSikuekr8hzkmCFdrBXqHegxP6oy08SEc0uu",
                "role": [
                    "user",
                    "donor"
                ],
                "createdAt": "2024-07-26T09:51:01.329Z",
                "updatedAt": "2024-07-26T09:57:29.459Z",
                "__v": 1
            },
            "donations": [
                "66a37309d77aef7489da2486"
            ],
            "createdAt": "2024-07-26T09:57:29.382Z",
            "updatedAt": "2024-07-26T09:57:29.441Z",
            "__v": 1
        },
        "campaign": "66a37271d77aef7489da247c",
        "donationAmount": 25,
        "createdAt": "2024-07-26T09:57:29.419Z",
        "updatedAt": "2024-07-26T09:57:29.419Z",
        "__v": 0
    }
}
*/
