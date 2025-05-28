import { projectControllerCreate, projectControllerFindAllBuWorkspace } from "@store/api/swagger-provider-api";
import { sample } from "effector";

import { apiDomain } from "../api";

import type { FindAllProjectByWorkspaceResponseProjectDto } from "@/model";

/**
 * Получение проектов пространства
 */
export const $projects = apiDomain.store<FindAllProjectByWorkspaceResponseProjectDto[] | null>(null);
export const resetProjects = apiDomain.event();
export const getProjectsFx = apiDomain.effect(projectControllerFindAllBuWorkspace);

$projects.on(getProjectsFx.doneData, (_, response) => response.projects).reset(resetProjects);

export const createProjectFx = apiDomain.effect(projectControllerCreate);

sample({
    clock: createProjectFx.doneData,
    fn: (response) => response.project.workspaceId,
    target: getProjectsFx,
});
