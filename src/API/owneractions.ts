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
  tags: string[],
  imageFile: File 
): Promise<AxiosResponse<any>> => {
  try {
    const authToken = getAuthToken();

    const formData = new FormData();
    formData.append('contractAddress', contractAddress);
    formData.append('ownerPublicKey', ownerPublicKey);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('goalAmount', String(goalAmount)); 
    formData.append('tags', JSON.stringify(tags)); 
    formData.append('image', imageFile); 

    const response = await axios.post(`${BASE_URL}/owner/createcampaign`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const upload = async (file: File): Promise<AxiosResponse<any>> => {
  try{
    const authToken = getAuthToken();

    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${BASE_URL}/owner/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': authToken,
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
}