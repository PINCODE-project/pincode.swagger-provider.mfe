import { apiDomain } from "@store/api";
import { microserviceControllerCreate } from "@store/api/swagger-provider-api";

import type { CreateMicroserviceDto } from "@/model";

/**
 * Создание микросервиса
 */
export const createMicroserviceFx = apiDomain.effect(microserviceControllerCreate); 