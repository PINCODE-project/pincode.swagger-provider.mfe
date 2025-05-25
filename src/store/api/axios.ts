import Axios, { AxiosError, AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({
    baseURL: "http://localhost:9001/",
    // baseURL: "https://backend-keystation.pincode-infra.ru/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    return AXIOS_INSTANCE({
        ...config,
        ...options,
    }).then(({ data }) => data);
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
