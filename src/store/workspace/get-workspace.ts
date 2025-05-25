import { apiDomain } from "@store/api";
import { workspaceControllerFindAll, workspaceControllerFindOne } from "@store/api/swagger-provider-api";

import type { FindWorkspaceResponsePartDto } from "@/model";

/**
 * Получение всех пространств пользователя
 */
export const $workspaces = apiDomain.store<FindWorkspaceResponsePartDto[] | null>(null);
export const resetWorkspaces = apiDomain.event();
export const getWorkspacesFx = apiDomain.effect(workspaceControllerFindAll);

$workspaces.on(getWorkspacesFx.doneData, (_, response) => response.workspaces).reset(resetWorkspaces);

/**
 * Получение пространства по ID
 */
export const $workspace = apiDomain.store<FindWorkspaceResponsePartDto | null>(null);
export const resetWorkspace = apiDomain.event();
export const getWorkspaceFx = apiDomain.effect(workspaceControllerFindOne);

$workspace.on(getWorkspaceFx.doneData, (_, response) => response.workspace).reset(resetWorkspace);
