import { apiDomain } from "@store/api";
import { authControllerConnect } from "@store/api/swagger-provider-api";

export const oauthLoginFx = apiDomain.effect(authControllerConnect);
