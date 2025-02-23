import { apiDomain, resetDomain } from "@store/api";
import { authControllerLogout } from "@store/api/swagger-provider-api";
import { AxiosResponse } from "axios";
import { sample } from "effector";

export const logoutFx = apiDomain.effect(authControllerLogout<AxiosResponse>);
export const logout = apiDomain.event();

sample({
    clock: logout,
    target: logoutFx,
});

sample({
    clock: logoutFx.done,
    target: resetDomain,
});
