import { apiDomain } from "@store/api";
import { authControllerConnect } from "@store/api/swagger-provider-api";
import { AxiosResponse } from "axios";

export const oauthLoginFx = apiDomain.effect(authControllerConnect<AxiosResponse>);
