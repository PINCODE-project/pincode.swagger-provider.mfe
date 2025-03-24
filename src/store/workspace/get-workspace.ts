import { sample } from "effector";
import { AxiosResponse } from "axios";
import { apiDomain } from "@store/api";
import {
    workspaceControllerCreate,
    workspaceControllerFindAll,
    workspaceControllerFindOne,
} from "@store/api/swagger-provider-api";

/**
 * Получение всех пространств пользователя
 */
export const $workspaces = apiDomain.store<any[] | null>(null);
export const resetWorkspaces = apiDomain.event();
export const getWorkspacesFx = apiDomain.effect(workspaceControllerFindAll<AxiosResponse>);

export const createWorkspaceFx = apiDomain.effect(workspaceControllerCreate<AxiosResponse>);

$workspaces.on(getWorkspacesFx.doneData, (_, response) => response.data).reset(resetWorkspaces);

sample({
    clock: createWorkspaceFx.done,
    target: getWorkspacesFx,
});

/**
 * Получение пространства по ID
 */
export const $workspace = apiDomain.store<null>(null);
export const resetWorkspace = apiDomain.event();
export const getWorkspaceFx = apiDomain.effect(workspaceControllerFindOne<AxiosResponse>);

$workspace.on(getWorkspaceFx.doneData, (_, response) => response.data).reset(resetWorkspace);
