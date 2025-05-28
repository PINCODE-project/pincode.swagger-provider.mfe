import { apiDomain } from "@store/api";
import { microserviceControllerCreate } from "@store/api/swagger-provider-api";

/**
 * Создание микросервиса
 */
export const createMicroserviceFx = apiDomain.effect(microserviceControllerCreate);
