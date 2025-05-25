import { apiDomain } from "@store/api";
import { microserviceControllerFindOne } from "@store/api/swagger-provider-api";

import type { GetMicroserviceResponseDto } from "@/model";

/**
 * Получение микросервиса по ID
 */
export const $microservice = apiDomain.store<GetMicroserviceResponseDto | null>(null);
export const setMicroservice = apiDomain.event<GetMicroserviceResponseDto | null>();

export const getMicroserviceFx = apiDomain.effect(microserviceControllerFindOne);

$microservice.on(setMicroservice, (_, value) => value).on(getMicroserviceFx.doneData, (_, response) => response);
