import { ConfigRouteProps } from "@router/types";

export const WorkspaceRouter = {
    WorkspacePage: (workspaceId: string) => `/workspace/${workspaceId}`,
};

export const workspaceRouteConfig: ConfigRouteProps[] = [
    {
        path: WorkspaceRouter.WorkspacePage(":workspaceId"),
        element: <div>workspace</div>,
    },
];
