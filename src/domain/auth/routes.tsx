import { ConfigRouteProps } from "@router/types";

import { LoginPage } from "./pages/LoginPage";

export const AuthRouter = {
    LoginPage: "/login",
    RegistrationPage: "/registration",
    ForgotPasswordPage: "/forgot-password",
};

export const authRouteConfig: ConfigRouteProps[] = [
    {
        path: AuthRouter.LoginPage,
        element: <LoginPage />,
        withNoAuthGuard: true,
    },
    {
        path: AuthRouter.RegistrationPage,
        element: <div>123</div>,
    },
    {
        path: AuthRouter.ForgotPasswordPage,
        element: <div>234</div>,
    },
];
