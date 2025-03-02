import MicroserviceSchemePage from "@/domain/microservice/pages/MicroserviceSchemePage";

import { ConfigRouteProps } from "@/router/types";

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
