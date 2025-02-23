import { apiDomain } from "@store/api";
import { workspaceControllerFindAll, workspaceControllerFindOne } from "@store/api/swagger-provider-api";
import { AxiosResponse } from "axios";

/**
 * Получение всех пространств пользователя
 */
export const $workspaces = apiDomain.store<any[] | null>(null);
export const resetWorkspaces = apiDomain.event();
export const getWorkspacesFx = apiDomain.effect(workspaceControllerFindAll<AxiosResponse>);

$workspaces.on(getWorkspacesFx.doneData, (_, response) => response.data).reset(resetWorkspaces);

/**
 * Получение пространства по ID
 */
export const $workspace = apiDomain.store<null>(null);
export const resetWorkspace = apiDomain.event();
export const getWorkspaceFx = apiDomain.effect(workspaceControllerFindOne<AxiosResponse>);

$workspace.on(getWorkspaceFx.doneData, (_, response) => response.data).reset(resetWorkspace);
