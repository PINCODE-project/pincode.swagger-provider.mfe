import { ConfigRouteProps } from "../types";

export const WorkspaceRouter = {
    WorkspacePage: (workspaceId: string) => `/workspace/${workspaceId}`,
};

export const workspaceRouteConfig: ConfigRouteProps[] = [
    {
        path: WorkspaceRouter.WorkspacePage(":workspaceId"),
        element: <div>workspace</div>,
    },
];
