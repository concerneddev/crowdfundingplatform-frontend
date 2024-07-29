import axios from "axios";
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
        if(axios.isAxiosError(error)) {
            console.log(error.response);
            throw error.response;
        }
        throw error;
    }
};
