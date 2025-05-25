import { Navigate, Route, Routes } from "react-router-dom";
import { AuthCallbackPage } from "@domain/auth/pages/AuthCallbackPage";
import MicroserviceSchemePage from "@domain/microservice/pages/MicroserviceSchemePage";
import MicroserviceSidebar from "@components/Sidebar/MicroserviceSidebar.tsx";
import Layout from "@components/Layout";
import WorkspacePage from "@domain/workspace/pages/WorkspacePage.tsx";

import { AuthRouter, DashboardRouter, HomeRouter, MicroserviceRouter, WorkspaceRouter } from "./constants";
import { ProtectRoute } from "./ProtectRoute";

import { LoginPage } from "@/domain/auth/pages/LoginPage";
import DashboardPage from "@/domain/dashboard/pages/DashboardPage";

export const AppRouter = () => {
    return (
        <Routes>
            <Route key="/">
                <Route key="no-auth-routes" element={<ProtectRoute withNoAuthGuard={true} />}>
                    <Route key="login" path={AuthRouter.LoginPage} element={<LoginPage />} />
                    {/* <Route key="registration" path={AuthRouter.RegistrationPage} element={<RegistrationPage />} /> */}
                    <Route key="auth-callback" path={AuthRouter.AuthCallbackPage} element={<AuthCallbackPage />} />
                </Route>

                <Route key="auth-routes" element={<ProtectRoute withAuthGuard={true} />}>
                    <Route key="with-sidebar" element={<Layout />}>
                        <Route key="dashboard" path={DashboardRouter.DashboardPage} element={<DashboardPage />} />
                    </Route>
                    <Route key="with-microservice-sidebar" element={<Layout SecondSidebar={MicroserviceSidebar} />}>
                        <Route
                            key="workspace"
                            path={WorkspaceRouter.WorkspacePage(":workspaceId")}
                            element={<WorkspacePage />}
                        />
                        <Route
                            key="microservice-scheme"
                            path={MicroserviceRouter.MicroserviceSchemePage(":workspaceId", ":microserviceId")}
                            element={<MicroserviceSchemePage />}
                        />
                    </Route>
                </Route>

                <Route key="home" path="" element={<Navigate to={HomeRouter.HomePage} />} />
                <Route key="not-found" path="*" element={"Not Found"} />
            </Route>
        </Routes>
    );
};
