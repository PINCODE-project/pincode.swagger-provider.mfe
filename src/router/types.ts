import { RouteProps } from "react-router-dom";

export type ConfigRouteProps = Omit<RouteProps, "children"> & {
    children?: ConfigRouteProps[];
    withAuthGuard?: boolean;
    withNoAuthGuard?: boolean;
};
