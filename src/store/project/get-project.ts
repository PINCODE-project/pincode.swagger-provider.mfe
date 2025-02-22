import { apiDomain } from "../api";
import { projectControllerFindAllBuWorkspace } from "@/store/api/swagger-provider-api";
import { AxiosResponse } from "axios";

/**
 * Получение проектов пространства
 */
export const $projects = apiDomain.store<any[]>([]);
export const resetProjects = apiDomain.event();
export const getProjectsFx = apiDomain.effect(projectControllerFindAllBuWorkspace<AxiosResponse>);

$projects.on(getProjectsFx.doneData, (_, response) => response.data).reset(resetProjects);
