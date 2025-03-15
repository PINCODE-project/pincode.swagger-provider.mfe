import { apiDomain, resetDomain } from "@store/api";
import { sample } from "effector";

export const logoutFx = apiDomain.effect();
export const logout = apiDomain.event();

sample({
    clock: logout,
    target: logoutFx,
});

sample({
    clock: logoutFx.done,
    target: resetDomain,
});
