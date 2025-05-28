import {
    Input,
    Label,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarNavigation,
} from "@pin-code/uikit.lib";
import { Search } from "lucide-react";
import { NavItem } from "@components/Sidebar/index";
import { FC, useEffect, useMemo } from "react";
import { useUnit } from "effector-react/effector-react.umd";
import { $projects, getProjectsFx } from "@store/project/get-project";
import Loader from "@components/Loader";
import { useParams } from "react-router-dom";

const MicroserviceSidebar: FC = () => {
    const { workspaceId } = useParams();

    const [getProjects, isLoadingGetProjects] = useUnit([getProjectsFx, getProjectsFx.pending]);
    const projects = useUnit($projects);

    const items: NavItem[] = useMemo(() => {
        return projects
            ? projects.map((project) => ({
                  id: project.id,
                  icon: project.emoji,
                  title: project.name,
                  // url: `project/${project.id}`,
                  subItems: project.microservices.map((microservice: any) => ({
                      id: microservice.id,
                      title: microservice.name,
                      url: `workspace/${workspaceId}/microservice/${microservice.id}`,
                  })),
              }))
            : [];
    }, [projects, workspaceId]);

    useEffect(() => {
        getProjects(workspaceId || "");
    }, [getProjects, workspaceId]);

    return (
        <Sidebar
            collapsible="none"
            className="hidden flex-1 md:!flex !w-[calc(350px_-_var(--sidebar-width-icon)_+_1px)]"
        >
            <SidebarHeader>
                <form>
                    <SidebarGroup className="py-0">
                        <SidebarGroupContent className="relative">
                            <Label htmlFor="search" className="sr-only">
                                Поиск
                            </Label>
                            <Input id="search" placeholder="Поиск..." className="pl-8" />
                            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </form>
            </SidebarHeader>
            <SidebarContent className="overflow-x-hidden">
                {isLoadingGetProjects || !projects ? <Loader /> : <SidebarNavigation items={items} label={"Схемы"} />}
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </Sidebar>
    );
};

export default MicroserviceSidebar;
