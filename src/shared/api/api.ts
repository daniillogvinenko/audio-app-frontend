import axios from "axios";

export const axiosApi = axios.create({
    baseURL: __API__,
});
