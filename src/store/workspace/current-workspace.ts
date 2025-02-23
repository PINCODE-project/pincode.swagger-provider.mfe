import { apiDomain } from "@store/api";
import persist from "effector-localstorage";

export const $currentWorkspace = apiDomain.store<string | null>(null);

persist({
    key: "Swagger-Provider-workspace",
    store: $currentWorkspace,
});
