import { apiDomain } from "@store/api";
import { authControllerLogin } from "@store/api/swagger-provider-api";

export const loginFx = apiDomain.effect(authControllerLogin);
