import { FC, ReactNode } from "react";
import { ThemeToggle } from "@pin-code/uikit.lib";
import { Link } from "react-router-dom";

import { LoginForm, LoginFormProps } from "./login-form";

type FullLoginPageProps = LoginFormProps & {
    logo: ReactNode;
    image: string;
};

const FullLoginPage: FC<FullLoginPageProps> = (props) => {
    // const { Link } = useRouter();
    return (
        <div className="grid min-h-svh lg:!grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:!p-10">
                <div className="flex justify-center gap-2 md:!justify-start">
                    <Link to="" className="flex items-center gap-2 font-medium">
                        {props.logo}
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-[450px]">
                        <LoginForm {...props} />
                    </div>
                </div>
                <div className="flex justify-center md:!justify-start">
                    <ThemeToggle />
                </div>
            </div>
            <div className="relative hidden bg-muted lg:!block">
                <img
                    src={props.image}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
                />
            </div>
        </div>
    );
};

export { FullLoginPage, type FullLoginPageProps };
