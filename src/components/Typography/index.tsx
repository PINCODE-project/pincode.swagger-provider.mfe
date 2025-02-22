import { cn } from "@pin-code/uikit.lib";
import { FC, ReactNode } from "react";

type TypographyProps = {
    children: ReactNode;
    className?: string;
};

const H1: FC<TypographyProps> = ({ children, className }) => {
    return (
        <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>{children}</h1>
    );
};

const H2: FC<TypographyProps> = ({ children, className }) => {
    return (
        <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
            {children}
        </h2>
    );
};

const H3: FC<TypographyProps> = ({ children, className }) => {
    return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>{children}</h3>;
};

const H4: FC<TypographyProps> = ({ children, className }) => {
    return <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>{children}</h4>;
};

export const Typography = { H1, H2, H3, H4 };
