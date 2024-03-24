import axios from "axios";
import config from "../../const/config";

export class TodoService {
    baseUrl = '';

    constructor() {
        this.baseUrl = config.baseUrl;
    }

    async get() {
        try {
            const response = await axios.get(`${this.baseUrl}/todos`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async add(data) {
        try {
            const response = await axios.post(`${this.baseUrl}/todos`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async edit(id, data) {
        try {
            const response = await axios.patch(`${this.baseUrl}/todos/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const response = await axios.delete(`${this.baseUrl}/todos/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

const todoService = new TodoService();
export default todoService;