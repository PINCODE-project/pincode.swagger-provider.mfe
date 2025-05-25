// Generic для получения пути из динамических роутов
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtractPath<T> = T extends (...args: any) => infer R ? (R extends string ? R : never) : T;

export const AuthRouter = {
    LoginPage: "/auth/login",
    RegistrationPage: "/auth/registration",
    ForgotPasswordPage: "/auth/forgot-password",
    AuthCallbackPage: "/auth/callback",
} as const;

export const DashboardRouter = {
    DashboardPage: "/dashboard",
} as const;

export const HomeRouter = {
    HomePage: DashboardRouter.DashboardPage,
} as const;

export const MicroserviceRouter = {
    MicroserviceSchemePage: (workspaceId: string, microserviceId: string) =>
        `workspace/${workspaceId}/microservice/${microserviceId}` as const,
};

export const WorkspaceRouter = {
    WorkspacePage: (workspaceId: string) => `/workspace/${workspaceId}` as const,
};

type AuthRouterPaths = (typeof AuthRouter)[keyof typeof AuthRouter];
type DashboardRouterPaths = (typeof DashboardRouter)[keyof typeof DashboardRouter];
type HomeRouterPaths = (typeof HomeRouter)[keyof typeof HomeRouter];
type MicroserviceRouterPaths = ExtractPath<(typeof MicroserviceRouter)[keyof typeof MicroserviceRouter]>;
type WorkspaceRouterPaths = ExtractPath<(typeof WorkspaceRouter)[keyof typeof WorkspaceRouter]>;

// Объединённый тип всех путей
export type RouterPaths =
    | AuthRouterPaths
    | HomeRouterPaths
    | DashboardRouterPaths
    | MicroserviceRouterPaths
    | WorkspaceRouterPaths;
