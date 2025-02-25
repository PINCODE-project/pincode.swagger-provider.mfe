import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://pincode-dev.ru/swagger/",
    withCredentials: true,
});
