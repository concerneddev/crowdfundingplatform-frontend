import axios from "axios";
import { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:5555";

// Function to get the auth token from sessionStorage
const getAuthToken = (): string | null => {
    return sessionStorage.getItem('x-auth-token');
};

export const donateCampaign = async (
  contractAddress: string,
  donorPublicKey: string,
  donationAmount: number
): Promise<AxiosResponse<any>> => {
  try {
    const authToken = getAuthToken();

    const requestBody = {
      contractAddress,
      donorPublicKey,
      donationAmount
    };

    const response = await axios.post(`${BASE_URL}/donor/donatecampaign`, requestBody, {
      headers: {
        "x-auth-token": authToken ? authToken : "",
      },
    });

    console.log("Axios_Response: ", response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios_Error: ", error.response);
      throw error.response;
    }
    throw error;
  }

}
