import axios from "axios";
import { AxiosResponse } from "axios";

interface RegisterResponse {
    message: string;
}

interface LoginResponse {
    token: string;
}

const BASE_URL = "http://localhost:5555";

export const register = async (username: string, password: string): Promise<AxiosResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(`${BASE_URL}/auth/register`, {
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
            }__
            */
            // throw { response: error.response || "An error occurred" };
            console.log(error.response);
            throw error.response;
        }
        throw error;
    }
};

export const login = async (username: string, password: string): Promise<any> => {
    try{
        const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, {
            username,
            password
        });
        console.log(response); // remove this later
        sessionStorage.setItem("x-auth-token", response.data.token);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response);
            throw error.response || "An error occurred";
        }
        throw error;
    }
};