import { apiDomain, resetDomain } from "@store/api";
import { sample } from "effector";

export const logout = apiDomain.event();

sample({
    clock: logout,
    target: resetDomain,
});
