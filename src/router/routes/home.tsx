import { Navigate } from "react-router-dom";
import DashboardPage from "@pages/DashboardPage";

import { ConfigRouteProps } from "../types";

export const HomeRouter = {
    HomePage: "/dashboard",
};

export const homeRouteConfig: ConfigRouteProps[] = [
    {
        path: "/",
        element: <Navigate to={HomeRouter.HomePage} />,
        withAuthGuard: true,
    },
    {
        path: HomeRouter.HomePage,
        element: <DashboardPage />,
        withAuthGuard: true,
    },
];
