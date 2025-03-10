import { Button, Input, Label } from "@pin-code/uikit.lib";
import { ComponentProps, ReactNode, useState } from "react";

type LoginFormProps = Omit<ComponentProps<"div">, "onSubmit"> & {
    title: string;
    description: string;
    type: "login" | "email";
    onRegister?: () => void;
    onForgotPassword?: () => void;
    onSubmit: ({ email, password, login }: { email: string; password: string; login: string }) => void;
    oauthButtons?: { title: string; icon: ReactNode; onClick: () => void }[];
};

const LoginForm = ({
    title,
    description,
    type,
    onSubmit,
    onRegister,
    onForgotPassword,
    oauthButtons,
}: LoginFormProps) => {
    const [email, setEmail] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <form
            className="p-6 md:p-8"
            onSubmit={(event) => {
                event.preventDefault();
                onSubmit({ email, password, login });
            }}
        >
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="text-balance text-muted-foreground whitespace-pre-wrap">{description}</p>
                </div>
                {type === "login" && (
                    <div className="grid gap-2">
                        <Label htmlFor="email">Логин</Label>
                        <Input
                            id="login"
                            type="text"
                            placeholder="test"
                            required
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>
                )}
                {type === "email" && (
                    <div className="grid gap-2">
                        <Label htmlFor="email">Почта</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="test@mail.ru"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                )}
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Пароль</Label>
                        <button
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                            onClick={onForgotPassword}
                        >
                            Забыли пароль?
                        </button>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="****"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Войти
                </Button>

                {oauthButtons && oauthButtons.length > 0 && (
                    <>
                        <div className="relative text-center text-sm after:!absolute after:!inset-0 after:!top-1/2 after:!z-0 after:!flex after:!items-center after:!border-t after:!border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                или войдите через
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {oauthButtons.map((button, index) => (
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        button.onClick();
                                    }}
                                    key={`oauthbutton${index}`}
                                >
                                    {button.icon}
                                    {button.title}
                                </Button>
                            ))}
                        </div>
                    </>
                )}

                {onRegister && (
                    <div className="text-center text-sm">
                        Нет аккаунта?{" "}
                        <button className="underline underline-offset-4" onClick={onRegister}>
                            Зарегистрироваться
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

export { LoginForm, type LoginFormProps };
