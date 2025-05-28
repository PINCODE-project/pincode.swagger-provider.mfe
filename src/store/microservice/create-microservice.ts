import { apiDomain } from "@store/api";
import { microserviceControllerCreate } from "@store/api/swagger-provider-api";
import { sample } from "effector";
import { getProjectsFx } from "@store/project/get-project.ts";

/**
 * Создание микросервиса
 */
export const createMicroserviceFx = apiDomain.effect(microserviceControllerCreate);

sample({
    clock: createMicroserviceFx.doneData,
    // @ts-ignore
    fn: (response) => response.workspaceId,
    target: getProjectsFx,
});
