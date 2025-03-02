import { FC, useCallback } from "react";
import { Route, RouteProps, Routes } from "react-router-dom";

import { ConfigRouteProps } from "./types";
import { routeConfig } from "./routes";
import { ProtectRoute } from "./ProtectRoute";

type AppRouterProps = RouteProps;

export const AppRouter: FC<AppRouterProps> = ({ element, path }) => {
    const renderRoute = useCallback(
        (route: ConfigRouteProps) => (
            <Route
                key={route.path}
                path={route.path}
                element={
                    <ProtectRoute withAuthGuard={route.withAuthGuard} withNoAuthGuard={route.withNoAuthGuard}>
                        {route.element}
                    </ProtectRoute>
                }
            >
                {route.children?.map((r) => renderRoute({ ...r, path: `${route.path}${r.path}` }))}
            </Route>
        ),
        [],
    );

    return (
        <Routes>
            <Route key="/" path={path} element={element}>
                {routeConfig.map(renderRoute)}
            </Route>
        </Routes>
    );
};
