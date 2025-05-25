import { apiDomain } from "@store/api";
import { workspaceControllerCreate } from "@store/api/swagger-provider-api.ts";
import { sample } from "effector";
import { getWorkspacesFx } from "@store/workspace/get-workspace.ts";

export const createWorkspaceFx = apiDomain.effect(workspaceControllerCreate);

sample({
    clock: createWorkspaceFx.done,
    target: getWorkspacesFx,
});

export const $isOpenCreateWorkspace = apiDomain.store<boolean>(false);
export const setIsOpenCreateWorkspace = apiDomain.event<boolean>();

$isOpenCreateWorkspace.on(setIsOpenCreateWorkspace, (_, value) => value);
