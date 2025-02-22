import { apiDomain } from "@/store/api";
import { authControllerLogin } from "@/store/api/swagger-provider-api";
import { AxiosResponse } from "axios";

export const loginFx = apiDomain.effect(authControllerLogin<AxiosResponse>)
