import { ConfigRouteProps } from "../types";
import MicroserviceSchemePage from "@/pages/MicroserviceSchemePage";

export const MicroserviceRouter = {
    MicroserviceSchemePage: (workspaceId: string, microserviceId: string) =>
        `workspace/${workspaceId}/microservice/${microserviceId}`,
};

export const microserviceRouteConfig: ConfigRouteProps[] = [
    {
        path: MicroserviceRouter.MicroserviceSchemePage(":workspaceId", ":microserviceId"),
        element: <MicroserviceSchemePage />,
    },
];
