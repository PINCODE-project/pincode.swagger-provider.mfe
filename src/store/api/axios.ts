import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://backend-swagger.pincode-infra.ru/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
