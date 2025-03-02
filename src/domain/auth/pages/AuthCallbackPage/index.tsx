import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { setAccessToken } from "@store/api/auth-token-storage";
import { setIsAuth } from "@store/auth/token";
import { HomeRouter } from "@router/routes";

export const AuthCallbackPage = () => {
    const [searchParams] = useSearchParams({ accessToken: "" });

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");

        if (accessToken) {
            setAccessToken(accessToken);
            setIsAuth(true);
        }
    }, [searchParams]);

    return <Navigate to={HomeRouter.HomePage} />;
};
