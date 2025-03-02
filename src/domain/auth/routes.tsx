import { ConfigRouteProps } from "@router/types";

import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import { LoginPage } from "./pages/LoginPage";

export const AuthRouter = {
    LoginPage: "/login",
    RegistrationPage: "/registration",
    ForgotPasswordPage: "/forgot-password",
    AuthCallbackPage: "/auth/callback",
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
        withNoAuthGuard: true,
    },
    {
        path: AuthRouter.ForgotPasswordPage,
        element: <div>234</div>,
    },
    {
        path: AuthRouter.AuthCallbackPage,
        element: <AuthCallbackPage />,
    },
];
