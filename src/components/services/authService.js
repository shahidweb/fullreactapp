import axios from "axios";
import config from "../../const/config";

export class AuthService {
    baseUrl = '';

    constructor() {
        this.baseUrl = config.baseUrl;
    }

    async createUser(data) {
        try {
            const response = await axios.post(`${this.baseUrl}/user/register`, data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async login(data) {
        try {
            const response = await axios.post(`${this.baseUrl}/users/login`, data);
            document.cookie = `accessToken=${response.data.data.accessToken};`
            document.cookie = `refreshToken=${response.data.data.refreshToken};`
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async logout(data) {
        try {
            let decodedCookie = document.cookie
            let tokens = decodedCookie.split(';');
            const axiosConfig = {
                headers: {"cookies": tokens[0] }
            };
            const res = await axios.post(`${this.baseUrl}/users/logout`, data, axiosConfig);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService();
export default authService;