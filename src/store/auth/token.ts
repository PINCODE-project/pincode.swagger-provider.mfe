import { AxiosResponse } from "axios";
import { sample } from "effector";
import { persist } from "effector-storage/local";
import { userControllerFindProfile } from "@store/api/swagger-provider-api";
import { setProfile } from "@store/auth/profile";

import { apiDomain } from "../api";
import { axiosInstance } from "../api/axios";

const changeToken = (token: string) => {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

    return token;
};

export const $token = apiDomain.store("");
export const tokenReceived = apiDomain.event<string>();
export const tokenExpired = apiDomain.event();

$token.on(tokenReceived, (_, token) => token).reset(tokenExpired);

export const $isAuth = apiDomain.store<boolean | null>(null);
export const setIsAuth = apiDomain.event<boolean | null>();

$isAuth.on(tokenExpired, () => false).on(setIsAuth, (_, value) => value);

export const checkTokenFx = apiDomain.effect(userControllerFindProfile<AxiosResponse>);

sample({
    clock: checkTokenFx.doneData,
    fn: (response) => response.data.data,
    target: setProfile,
});

persist({
    key: "swagger-provider-access-token",
    store: $token,
    serialize: changeToken,
    deserialize: changeToken,
});
