import axios from "axios";
import { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:5555";

// Function to get the auth token from sessionStorage
const getAuthToken = (): string | null => {
  return sessionStorage.getItem('x-auth-token');
};

export const createCampaign = async (
  contractAddress: string,
  ownerPublicKey: string,
  title: string,
  description: string,
  goalAmount: number,
  tags: string[]
): Promise<AxiosResponse<any>> => {
  try {
    const authToken = getAuthToken();

    const requestBody = {
      contractAddress,
      ownerPublicKey,
      title,
      description,
      goalAmount,
      tags,
    };

    const response = await axios.post(`${BASE_URL}/owner/createcampaign`, requestBody, {
      headers: {
        "x-auth-token": authToken ? authToken : "",
      },
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios: ", error.response);
      throw error.response;
    }
    throw error;
  }
};

export const withdrawCampaign = async (contractAddress: string, finalAmount: number): Promise<AxiosResponse<any>> => {
  try {
    const authToken = getAuthToken();

    const requestBody = {
      contractAddress,
      finalAmount
    };

    const response = await axios.post(`${BASE_URL}/owner/withdrawcampaign`, requestBody, {
      headers: {
        "x-auth-token": authToken ? authToken : "",
      },
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios: ", error.response);
      throw error.response;
    }
    throw error;
  }
};