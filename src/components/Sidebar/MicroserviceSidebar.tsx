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
    Button,
} from "@pin-code/uikit.lib";
import { Search, Plus } from "lucide-react";
import { NavItem } from "@components/Sidebar/index";
import { FC, useEffect, useMemo, useState } from "react";
import { useUnit } from "effector-react/effector-react.umd";
import { $projects, getProjectsFx } from "@store/project/get-project";
import Loader from "@components/Loader";
import { useParams } from "react-router-dom";
import { MicroserviceSidebar as CreateMicroserviceSidebar } from "@domain/microservice/components/MicroserviceSidebar";

const MicroserviceSidebar: FC = () => {
    const { workspaceId } = useParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <>
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
                <SidebarFooter className="p-3">
                    <Button onClick={() => setIsSidebarOpen(true)} variant="default" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Создать микросервис
                    </Button>
                </SidebarFooter>
            </Sidebar>
            
            <CreateMicroserviceSidebar 
                isOpen={isSidebarOpen} 
                setIsOpen={setIsSidebarOpen} 
                isCreating={true} 
            />
        </>
    );
};

export default MicroserviceSidebar;
