import React, { FC } from "react";
import { Command, DraftingCompass, LayoutList, Server } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    ThemeToggle,
    useSidebar,
} from "@pin-code/uikit.lib";
import { NavUser } from "@components/Sidebar/NavUser";
import { $profile } from "@store/auth/profile";
import { useUnit } from "effector-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { HomeRouter } from "@router/constants.ts";

export type NavItem = {
    id: string;
    title: string;
    url?: string;
    subItems?: {
        id: string;
        title: string;
        url: string;
    }[];
    badge?: React.ReactNode;
    icon?: React.ReactNode;
};

const navItems = [
    {
        title: "Схемы",
        url: "#",
        icon: <Server size={16} />,
        isActive: true,
    },
    {
        title: "Коллекции",
        url: "#",
        icon: <DraftingCompass />,
        isActive: false,
    },
    {
        title: "Документация",
        url: "#",
        icon: <LayoutList size={16} />,
        isActive: false,
    },
];

type AppSidebarProps = {
    secondSidebar?: React.ReactNode;
};

const AppSidebar: FC<AppSidebarProps> = ({ secondSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { workspaceId } = useParams();

    const { open } = useSidebar();

    const profile = useUnit($profile);

    return (
        <>
            <Sidebar collapsible="icon" className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row">
                <Sidebar collapsible="none" className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" asChild className="md:!h-8 md:!p-0">
                                    {/* {isLoadingGetWorkspaces ? <Loader /> : <TeamSwitcher teams={teams} />} */}
                                    <Link to={HomeRouter.HomePage}>
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            <Command className="size-4" />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">Swagger Provider</span>
                                            <span className="truncate text-xs">Enterprise</span>
                                        </div>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent>
                        {/* {workspaceId && ( */}
                        {/*    <SidebarGroup> */}
                        {/*        <SidebarGroupContent className="px-1.5 md:!px-0"> */}
                        {/*            <SidebarMenu> */}
                        {/*                {navItems.map((item) => { */}
                        {/*                    const isActive = location.pathname.startsWith(item.url); */}

                        {/*                    return ( */}
                        {/*                        <SidebarMenuItem key={item.title}> */}
                        {/*                            <SidebarMenuButton */}
                        {/*                                tooltip={{ */}
                        {/*                                    children: item.title, */}
                        {/*                                    hidden: false, */}
                        {/*                                }} */}
                        {/*                                isActive={isActive} */}
                        {/*                                className="px-2.5 md:!px-2" */}
                        {/*                            > */}
                        {/*                                {item.icon} */}
                        {/*                                <span>{item.title}</span> */}
                        {/*                            </SidebarMenuButton> */}
                        {/*                        </SidebarMenuItem> */}
                        {/*                    ); */}
                        {/*                })} */}
                        {/*            </SidebarMenu> */}
                        {/*        </SidebarGroupContent> */}
                        {/*    </SidebarGroup> */}
                        {/* )} */}
                    </SidebarContent>
                    <SidebarFooter className="gap-4">
                        <NavUser user={profile} />
                        <ThemeToggle />
                    </SidebarFooter>
                </Sidebar>

                {secondSidebar && (
                    <>
                        {secondSidebar}
                        <SidebarTrigger
                            className="ml-3 mt-3 fixed top-0 left-2"
                            style={{ left: open ? "var(--sidebar-width)" : "var(--sidebar-width-icon)" }}
                        />
                    </>
                )}
            </Sidebar>
        </>
    );
};

export { AppSidebar };
