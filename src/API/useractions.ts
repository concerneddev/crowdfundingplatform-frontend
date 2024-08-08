import axios, { AxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:5555";

// Function to get the auth token from sessionStorage
const getAuthToken = (): string | null => {
    return sessionStorage.getItem('x-auth-token');
};

// get logged in user profile
export const profile = async (): Promise<AxiosResponse<any>> => {
    try {
        // Retrieve the auth token from sessionStorage
        const authToken = getAuthToken();

        // Set up Axios request config with auth token in headers if available
        const config = {
            headers: {
                'x-auth-token': authToken ? authToken : ''
            }
        };

        const response = await axios.get<any>(`${BASE_URL}/user/profile`, config);
        console.log(response);
        return response;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response);
            throw error.response;
        }
        throw error;
    }
};

// list recent campaigns
export const campaignsRecent = async (): Promise<AxiosResponse<any>> => {
    try {
        // skip authentication
        const response = await axios.get<any>(`${BASE_URL}/user/campaignsrecent`);
        console.log("Axios: ", response);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Axios:", error.response);
            throw error.response;
        }
        throw error;
    }
};

export const campaignById = async (campaignId: string | null): Promise<AxiosResponse<any>> => {
    try {
        const authToken = getAuthToken();
        const config = {
            headers: {
                "x-auth-token": authToken ? authToken : ""
            }
        };

        console.log(`Axios request: ${BASE_URL}/user/campaign/${campaignId}`);
        const response = await axios.get<any>(`${BASE_URL}/user/campaign/${campaignId}`, config);
        console.log("Axios: campaignById ", response);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Axios_error: ",error.response);
            throw error.response;
        }
        throw error;
    }
}

export const donationById = async (donationId: string | null): Promise<AxiosResponse<any>> => {
    try {
        const authToken = getAuthToken();
        const config = {
            headers: {
                "x-auth-token": authToken ? authToken : ""
            }
        };

        const response = await axios.get<any>(`${BASE_URL}/user/donation/${donationId}`, config);
        console.log("Axios: ", response);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response);
            throw error.response;
        }
        throw error;
    }
}

// returns list of all tags
export const tagsList = async (): Promise<AxiosResponse<any>> => {
    try {
        const authToken = getAuthToken();
        const config = {
            headers: {
                "x-auth-token": authToken ? authToken: ""
            }
        };

        const response = await axios.get<any>(`${BASE_URL}/user/tagslist/`, config);
        console.log("Axios: ", response);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)){
            console.log("Axios_Error: ", error.response);
            throw error.response;
        }
        throw error;
    }
};

export const campaignsByTag = async (tag: string | null): Promise<AxiosResponse<any>> => {
    try{ 
        const authToken = getAuthToken();
        const config = {
            headers: {
                "x-auth-token": authToken ? authToken : ""
            }
        };

        const response = await axios.get<any>(`${BASE_URL}/user/campaignsbytag/${tag}`,config);
        console.log("Axios: ", response);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)){
            console.log("Axios_Error: ", error.response);
            throw error.response;
        }
        throw error;
    }

};