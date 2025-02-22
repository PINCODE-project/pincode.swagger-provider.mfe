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
import { NavUser } from "@/components/Sidebar/NavUser";
import { $profile } from "@/store/auth/profile";
import { useUnit } from "effector-react";
import { Link, useParams } from "react-router-dom";
import { HomeRouter } from "@/router/routes/home";
import { WorkspaceRouter } from "@/router/routes/workspace";

export type NavItem = {
    title: string;
    url: string;
    subItems?: {
        title: string;
        url: string;
    }[];
    badge?: React.ReactNode;
    icon?: React.ReactNode;
};

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
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
    ],
};

type AppSidebarProps = {
    secondSidebar?: React.ReactNode;
};

const AppSidebar: FC<AppSidebarProps> = ({ secondSidebar }) => {
    const { workspaceId } = useParams();

    // const [getWorkspaces, isLoadingGetWorkspaces] = useUnit([getWorkspacesFx, getWorkspacesFx.pending]);
    // const workspaces = useUnit($workspaces);
    // Note: I'm using state to show active item.
    // IRL you should use the url/router.
    // const [activeItem, setActiveItem] = React.useState("Inbox");
    const activeItem = "Статьи";
    const { open } = useSidebar();

    const profile = useUnit($profile);
    // const { setOpen } = useSidebar();

    // useEffect(() => {
    //     getWorkspaces();
    // }, []);

    // console.log(workspaces);
    // const teams = useMemo(
    //     () =>
    //         workspaces
    //             ? workspaces.map((workspace) => ({
    //                   name: workspace.name,
    //                   logo: workspace.emoji,
    //                   plan: "Enterprise",
    //               }))
    //             : [],
    //     [workspaces],
    // );

    //     [
    //     {
    //         name: "Acme Inc",
    //         logo: GalleryVerticalEnd,
    //         plan: "Enterprise",
    //     },
    //     {
    //         name: "Acme Corp.",
    //         logo: AudioWaveform,
    //         plan: "Startup",
    //     },
    //     {
    //         name: "Evil Corp.",
    //         logo: Command,
    //         plan: "Free",
    //     },
    // ];

    return (
        <>
            <Sidebar collapsible="icon" className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row">
                <Sidebar collapsible="none" className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" asChild className="md:!h-8 md:!p-0">
                                    {/*{isLoadingGetWorkspaces ? <Loader /> : <TeamSwitcher teams={teams} />}*/}
                                    <Link
                                        to={
                                            workspaceId
                                                ? WorkspaceRouter.WorkspacePage(workspaceId)
                                                : HomeRouter.HomePage
                                        }
                                    >
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
                        {workspaceId && (
                            <SidebarGroup>
                                <SidebarGroupContent className="px-1.5 md:!px-0">
                                    <SidebarMenu>
                                        {data.navMain.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    tooltip={{
                                                        children: item.title,
                                                        hidden: false,
                                                    }}
                                                    isActive={activeItem === item.title}
                                                    className="px-2.5 md:!px-2"
                                                >
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        )}
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
