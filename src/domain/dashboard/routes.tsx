import { ConfigRouteProps } from "@router/types";

import DashboardPage from "./pages/DashboardPage";

export const DashboardRouter = {
    DashboardPage: "/dashboard",
};

export const dashboardRouteConfig: ConfigRouteProps[] = [
    {
        path: DashboardRouter.DashboardPage,
        element: <DashboardPage />,
        withAuthGuard: true,
    },
];
