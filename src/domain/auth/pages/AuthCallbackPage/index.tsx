import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { $token, setIsAuth, tokenReceived } from "@store/auth/token";
import { HomeRouter } from "@router/routes";
import { useUnit } from "effector-react";

export const AuthCallbackPage = () => {
    const token = useUnit($token);
    const [searchParams] = useSearchParams({ accessToken: "" });

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");

        if (accessToken && token !== accessToken) {
            tokenReceived(accessToken);
            setIsAuth(null);
        }
    }, [searchParams, token]);

    return <Navigate to={HomeRouter.HomePage} />;
};
