import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import {
    ABI_CAMPAIGN_SEPOLIA,
} from "../../web3/constants";
import { donateCampaign } from "../../API/donoractions";
import { useNavigate } from "react-router-dom";
import useHealthCheckDb from "../../hooks/useHealthCheckDb";

declare var window: any;

interface UseCreateDonationParams {
    CONTRACT_ADDRESS: string;
    DONATION_AMOUNT: number;
};

const useCreateDonation = ({
    CONTRACT_ADDRESS,
    DONATION_AMOUNT,
}: UseCreateDonationParams
) => {
    const [response, setResponse] = useState<string>("");
    const navigate = useNavigate();
    const { id } = useParams<string>();
    const { checkDbHealth, status, error } = useHealthCheckDb(3, 1000);
    const [isDbHealthy, setIsDbHealthy] = useState<boolean>(false);
    var sequenceStatus: boolean = false;

    // ---- LOGGING THE DONATION IN THE BACKEND ----
    const createDonationBackend = async (
        DONOR_PUBLIC_KEY: string,
        DONATION_AMOUNT: number
    ) => {
        // fetch campaign contract address
        console.log(
            "createDonationBackend params: ",
            DONOR_PUBLIC_KEY,
            DONATION_AMOUNT
        );

        try {
            console.log("----- UPDATING DONATION IN THE BACKEND -----");
            const res = await donateCampaign(
                CONTRACT_ADDRESS,
                DONOR_PUBLIC_KEY,
                DONATION_AMOUNT
            );
            console.log(`
          CreateDonation
          createDonationBackend
          res:
          ${res}`);
            if (res.status === 201) {
                setResponse("Donation successful!");
                console.log("DONATION SUCCESSFUL!");
                navigate(`/campaign/${id}`);
            }
        } catch (error) {
            console.log("CreateDonation_error: ", error);
            return;
        }
        finally {
            sequenceStatus = false;
        }
    };

    // ----- LISTENING TO THE EVENTS -----
    const listenForCampaignEvent = async (contract: ethers.Contract) => {
        console.log("----- LISTENING TO EVENTS BEING EMITTED -----");
        await contract.on(
            "DonationReceived",
            async (mostRecentDonor, mostRecentDonationAmount, event) => {
                console.log("DonationReceived event triggered: ", {
                    mostRecentDonor: mostRecentDonor,
                    mostRecentDonationAmount: mostRecentDonationAmount,
                    data: event,
                });
                console.log("----- EVENT LISTENING COMPLETED -----");
                // mostRecentDonationAmount: 10000000000000000n
                // ethers.formatEther(BigInt(mostRecentDonationAmount)) === 0.01
                const donationAmount = ethers.formatEther(
                    BigInt(mostRecentDonationAmount)
                );
                console.log("Formatted BigNumber: ", donationAmount);
                if (sequenceStatus) {
                    await createDonationBackend(mostRecentDonor, Number(donationAmount));
                } else {
                    console.log("Backend update called out of sequence");
                    return;
                }
                console.log("Done!");
            }
        );
    };

    const donateCampaignOnChain = async (
    ) => {
        // access the contract on chain
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS,
                ABI_CAMPAIGN_SEPOLIA,
                signer
            );

            // donate to the contract
            try {
                const donationAmount: string = String(DONATION_AMOUNT);

                console.log("----- DONATING CAMPAIGN ON SEPOLIA TESTNET -----");
                const transactionResponse = await contract.donate({
                    value: ethers.parseEther(donationAmount),
                });

                console.log("Transaction Response: ", transactionResponse);
                sequenceStatus = true;

                await listenForCampaignEvent(contract);
            } catch (error: any) {
                console.log("Error: ", error);
                setResponse(error.code);
            }
        }
    };

    const donate = async () => {
        if(isDbHealthy) {
            try {
                await donateCampaignOnChain();
            } catch (error) {
                console.log("useCreateDonation_donate_error: ", error);
            }
        } else {
            console.warn("Database is not healthy.");
        }
    }

    useEffect(() => {
        if (status === "ok") {
            setIsDbHealthy(true);
        } else if (status === "no" || status === "unknown") {
            setIsDbHealthy(false);
            setResponse("Database is not healthy.");
        }
    }, [status]);

    useEffect(() => {
        checkDbHealth();
    }, []);


    return {
        response,
        donate
    }
}

export default useCreateDonation;