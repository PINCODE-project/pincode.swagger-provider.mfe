import { Navigate } from "react-router-dom";
import Layout from "@components/Layout";
import MicroserviceSidebar from "@components/Sidebar/MicroserviceSidebar";
import { authRouteConfig } from "@domain/auth";
import { microserviceRouteConfig } from "@domain/microservice";
import { dashboardRouteConfig, DashboardRouter } from "@domain/dashboard";
import { workspaceRouteConfig } from "@domain/workspace";

import { ConfigRouteProps } from "./types";

export const HomeRouter = {
    HomePage: DashboardRouter.DashboardPage,
};

export const homeRouteConfig: ConfigRouteProps[] = [
    {
        path: "/",
        element: <Navigate to={HomeRouter.HomePage} />,
        withAuthGuard: true,
    },
];

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
        children: [...dashboardRouteConfig],
        withAuthGuard: true,
    },
    {
        path: "",
        element: <Layout />,
        children: workspaceRouteConfig,
        withAuthGuard: true,
    },
    {
        path: "",
        element: <Layout SecondSidebar={MicroserviceSidebar} />,
        children: microserviceRouteConfig,
        withAuthGuard: true,
    },
    {
        path: "*",
        element: <div>error</div>,
    },
];
