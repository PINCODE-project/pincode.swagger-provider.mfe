import { userControllerFindProfile } from "@store/api/swagger-provider-api";
import { AxiosResponse } from "axios";
import { sample } from "effector";
import { setProfile } from "@store/auth/profile";

import { apiDomain } from "../api";

export const $isAuth = apiDomain.store<boolean | null>(null);
export const setIsAuth = apiDomain.event<boolean | null>();

$isAuth.on(setIsAuth, (_, value) => value);

export const checkTokenFx = apiDomain.effect(userControllerFindProfile<AxiosResponse>);

sample({
    clock: checkTokenFx.doneData,
    fn: (response) => response.data,
    target: setProfile,
});
