import axios from "axios";
import { AxiosResponse } from "axios";

interface RegisterResponse {
    message: string;
}

const baseURL = "http://localhost:5555";

const authAPI = {
    register: async (username: string, password: string): Promise<AxiosResponse> => {
        try {
            const response = await axios.post<RegisterResponse>(`${baseURL}/auth/register`, {
                username,
                password
            });
            console.log(response);
            return response;

        } catch (error: any){
            if(axios.isAxiosError(error)) {
                /*
                if (error.response?.status == 400) {
                    const errorData = error.response.data as AxiosResponse;
                    console.log("E:", errorData);
                    return errorData;
                }
                */
                // throw { response: error.response || "An error occurred" };
                throw error.response;
            }
            throw error;
        }
    },
};



export default authAPI;