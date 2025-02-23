import { authRouteConfig } from "@router/routes/auth";
import Layout from "@components/Layout";
import { homeRouteConfig } from "@router/routes/home";
import { workspaceRouteConfig } from "@router/routes/workspace";
import { microserviceRouteConfig } from "@router/routes/microservice";
import MicroserviceSidebar from "@components/Sidebar/MicroserviceSidebar";

import { ConfigRouteProps } from "../types";

export const routeConfig: ConfigRouteProps[] = [
    ...authRouteConfig,
    {
        path: "",
        element: <Layout />,
        children: [...homeRouteConfig],
        withAuthGuard: true,
    },
    {
        path: "",
        element: <Layout />,
        children: [...workspaceRouteConfig],
    },
    {
        path: "",
        element: <Layout SecondSidebar={MicroserviceSidebar} />,
        children: [...microserviceRouteConfig],
    },
    {
        path: "*",
        element: <div>error</div>,
    },
];
