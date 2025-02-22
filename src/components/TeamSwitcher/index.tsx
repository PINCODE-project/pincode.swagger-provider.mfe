import { ChevronsUpDown, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@pin-code/uikit.lib";
import { FC, ReactNode, useState } from "react";
import Loader from "@/components/Loader";

type TeamType = {
    name: string;
    logo: ReactNode;
    plan: string;
};
type TeamSwitcherProps = {
    teams: TeamType[];
    className?: string;
};

const TeamSwitcher: FC<TeamSwitcherProps> = ({ teams, className }) => {
    const { isMobile } = useSidebar();
    const [activeTeam, setActiveTeam] = useState<TeamType>(teams[0]!);

    if (!teams) return <Loader />;

    return (
        <SidebarMenu className={className}>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:!h-fit md:!p-0"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <div className="size-4">{activeTeam?.logo}</div>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight md:!hidden">
                                <span className="truncate font-semibold">{activeTeam?.name}</span>
                                <span className="truncate text-xs">{activeTeam?.plan}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto md:!hidden" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={16}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Рабочие пространства
                        </DropdownMenuLabel>
                        {teams.map((team) => (
                            <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className="gap-2 p-2">
                                <div className="flex size-6 items-center justify-center rounded-sm border">
                                    <div className="size-4 shrink-0">{team.logo}</div>
                                </div>
                                {team.name}
                                {/*<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>*/}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className=" gap-2 p-2">
                            <div className=" flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className=" size-4" />
                            </div>
                            <div className=" font-medium text-muted-foreground">Создать пространство</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default TeamSwitcher;
