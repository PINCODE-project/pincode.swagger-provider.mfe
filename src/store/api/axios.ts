import axios from "axios";

import { AuthTokenStorage } from "./auth-token-storage";

export const axiosInstance = axios.create({
    baseURL: "https://pincode-dev.ru/swagger/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = AuthTokenStorage.getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        // const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired

            if (err.response.status !== 401) {
                return Promise.reject(err.response.data);
            }

            // AuthTokenStorage.resetAccessToken();
            return Promise.reject(err.response.data);

            // if (!originalConfig._retry) {
            //     originalConfig._retry = true;

            //     try {
            //         // const rs = await refreshToken();
            //         // const { accessToken } = rs.data;
            //         // window.localStorage.setItem("accessToken", accessToken);
            //         // axiosInstance.defaults.headers.common["x-access-token"] = accessToken;
            //         // return axiosInstance(originalConfig);
            //     } catch (_error) {
            //         if (_error instanceof AxiosError && _error.response && _error.response.data) {
            //             return Promise.reject(_error.response.data);
            //         }

            //         return Promise.reject(_error);
            //     }
            // }
        }

        return Promise.reject(err);
    },
);
