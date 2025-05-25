import { useToast } from "@pin-code/uikit.lib";
import { GalleryVerticalEnd } from "lucide-react";
import { oauthLoginFx } from "@store/auth/oauth";
import { loginFx } from "@store/auth/login";
import { setIsAuth, tokenReceived } from "@store/auth/token";

import { FullLoginPage } from "../../components/LoginPage";

const LoginPage = () => {
    const { toast } = useToast();

    return (
        <FullLoginPage
            type="email"
            title="👋 Добро пожаловать"
            image="https://images.unsplash.com/photo-1653299832314-5d3dc1e5a83c?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            description={`Swagger Provider - уютное место
для ваших OpenAPI cхем`}
            logo={
                <>
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Swagger Provider
                </>
            }
            onSubmit={(args) => {
                loginFx(args)
                    .then((response) => {
                        tokenReceived(response.accessToken);
                        setIsAuth(null);
                    })
                    .catch(() =>
                        toast({ id: "incorrectPassword", title: "Неверный логин или пароль!", variant: "destructive" }),
                    );
            }}
            oauthButtons={[
                {
                    title: "Яндекс",
                    onClick: () => oauthLoginFx("yandex").then((response) => window.location.replace(response.url)),
                    icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z"
                                fill="#FC3F1D"
                            />
                            <path
                                d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z"
                                fill="#fff"
                            />
                        </svg>
                    ),
                },
                {
                    title: "GitHub",
                    onClick: () => oauthLoginFx("github").then((response) => window.location.replace(response.url)),
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                fill="currentColor"
                            />
                        </svg>
                    ),
                },
            ]}
        />
    );
};

export { LoginPage };
