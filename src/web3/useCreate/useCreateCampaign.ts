import React, { useContext, useEffect, useState } from "react";
import { createCampaign } from "../../API/owneractions";
import { ethers } from "ethers";
import {
    ABI_FACTORY_SEPOLIA,
    CONTRACT_ADDRESS_FACTORY_SEPOLIA,
} from "../../web3/constants";
import placeholderImage from "../../SVG/default-image.jpg"
import useHealthCheckDb from "../../hooks/useHealthCheckDb";

declare var window: any;

interface UseCreateParams {
    SIGNER: string;
    CAMPAIGN_TITLE: string;
    CAMPAIGN_DESCRIPTION: string;
    CAMPAIGN_GOAL_AMOUNT: number;
    CAMPAIGN_TAGS: string[];
    CAMPAIGN_IMAGE: File;
};

const useCreateCampaign = ({
    SIGNER,
    CAMPAIGN_TITLE,
    CAMPAIGN_DESCRIPTION,
    CAMPAIGN_GOAL_AMOUNT,
    CAMPAIGN_TAGS,
    CAMPAIGN_IMAGE
}: UseCreateParams
) => {
    const [response, setResponse] = useState<string>("");
    const { checkDbHealth, status, error } = useHealthCheckDb(3, 1000);
    const [isDbHealthy, setIsDbHealthy] = useState<boolean>(false);
    var sequenceStatus: boolean = false;

    // ----- CREATING CAMPAIGN IN THE BACKEND ----
    const createCampaignBackend = async (CAMPAIGN_ADDRESS: string) => {
        console.log("========== UPDATING CAMPAIGN DETAILS IN THE BACKEND ==========");
        try {
            const response = await createCampaign(
                CAMPAIGN_ADDRESS,
                SIGNER,
                CAMPAIGN_TITLE,
                CAMPAIGN_DESCRIPTION,
                CAMPAIGN_GOAL_AMOUNT,
                CAMPAIGN_TAGS,
                CAMPAIGN_IMAGE
            );
            setResponse("Campaign created successfully!");
            console.log("Campaign creation response:", response);
        } catch (error) {
            console.error("Error creating campaign:", error);
            setResponse("An error occurred. Please try again.");
        } finally {
            sequenceStatus = false;
        }
    };

    // ----- LISTENG TO THE EVENTS -----
    const listenForCampaignEvent = async (contract: ethers.Contract) => {
        console.log("========== LISTENING TO EVENTS BEING EMITTED ==========");
        await contract.on(
            "CampaignContractCreated",
            async (campaignAddress, senderAddress, goalAmount, event) => {
                console.log("CampaignContractCreated event triggered: ", {
                    campaignAddress: campaignAddress,
                    senderAddress: senderAddress,
                    goalAmount: goalAmount,
                    data: event,
                });
                console.log("========== EVENT LISTENING COMPLETED ==========");
                if(sequenceStatus) {
                    await createCampaignBackend(campaignAddress);
                } else {
                    console.log("Backend update called out of sequence.");
                    return;
                }
                console.log("Done!");
            }
        );
    };

    // ----- CREATING CAMPAIGN ON SEPOLIA TESTNET -----
    const createCampaignOnChain = async () => {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS_FACTORY_SEPOLIA,
                ABI_FACTORY_SEPOLIA,
                signer
            );

            try {
                console.log("========== CREATING CAMPAIGN ON SEPOLIA TESTNET ==========");
                setResponse("Creating Campaign On Chain");
                const goalAmount: number = CAMPAIGN_GOAL_AMOUNT;
                const goalAmountUint256: bigint = BigInt(Math.round(goalAmount * 1e18));

                const transactionResponse = await contract.createCampaign(
                    goalAmountUint256
                );
                console.log("Transaction Response: ", transactionResponse);
                setResponse("Listening to Events on Chain");
                sequenceStatus = true;
                await listenForCampaignEvent(contract);
            } catch (error: any) {
                setResponse(error.code);
                console.log("Error Code", error.code);
            }
        } else {
            setResponse("Metamask not installed!");
            console.log("useCreateCampaign: createCampaignOnChain: ERROR");
        }
    };

    const create = async () => {
        if (isDbHealthy) {
            try {
                await createCampaignOnChain();
            } catch (error) {
                console.log("useCreatCampaign_create_error: ", error);
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
        create
    };
}

export default useCreateCampaign;