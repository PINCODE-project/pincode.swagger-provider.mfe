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

const MicroserviceSidebar: FC = () => {
    const [getProjects, isLoadingGetProjects] = useUnit([getProjectsFx, getProjectsFx.pending]);
    const projects = useUnit($projects);

    const isLoading = isLoadingGetProjects;

    const items: NavItem[] = useMemo(() => {
        return projects.map((project) => ({
            icon: project.emoji,
            title: project.name,
            url: `project/${project.id}`,
            subItems: project.microservices.map((microservice: any) => ({
                title: microservice.name,
                url: `microservice/${microservice.id}`,
            })),
        }));
    }, [projects]);
    // const navItems: NavItem[] = [
    //     {
    //         icon: "✋🏻",
    //         title: "Изучение РЖЯ",
    //         url: "/123",
    //         subItems: [
    //             { title: "SSO", url: "/1" },
    //             { title: "ЛК пользователя", url: "/2" },
    //             { title: "Обучение (Темы, разделы, уровни)", url: "/3" },
    //         ],
    //     },
    //     {
    //         title: "Swagger Provider",
    //         url: "/getting-started",
    //         subItems: [
    //             { title: "Installation", url: "/installation" },
    //             { title: "Configuration", url: "/getting-started#configuration" },
    //         ],
    //     },
    //     {
    //         title: "Бекенд теханалитика",
    //         url: "/api-reference",
    //         icon: "🔥",
    //     },
    //     {
    //         title: "Сервис единой авторизации пин-код",
    //         url: "/фцвфцв",
    //         subItems: [{ title: "Общая поверхностная аналитика необходимых доработок", url: "/api-reference" }],
    //     },
    // ];

    useEffect(() => {
        getProjects("9214d1f3-2abe-488b-ad00-fc2a136ba419");
    }, [getProjects]);

    return (
        <Sidebar
            collapsible="none"
            className="hidden flex-1 md:flex !w-[calc(350px_-_var(--sidebar-width-icon)_+_1px)]"
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
                {isLoading ? <Loader /> : <SidebarNavigation items={items} label={"Схемы"} />}
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
        </Sidebar>
    );
};

export default MicroserviceSidebar;
