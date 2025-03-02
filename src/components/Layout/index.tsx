import { SidebarProvider } from "@pin-code/uikit.lib";
import { Outlet } from "react-router-dom";
import { CSSProperties, FC } from "react";

import { AppSidebar } from "@/components/Sidebar";
import { WorkSpaceSidebar } from "@/domain/workspace/components/WorkSpaceSidebar/WorkSpaceSidebar";

type LayoutProps = {
    SecondSidebar?: FC;
};

const Layout: FC<LayoutProps> = ({ SecondSidebar }) => {
    return (
        <SidebarProvider style={{ "--sidebar-width": SecondSidebar ? "350px" : "48px" } as CSSProperties}>
            <AppSidebar secondSidebar={SecondSidebar && <SecondSidebar />} />
            <main className="w-full">
                <Outlet />
            </main>
            <WorkSpaceSidebar/>
        </SidebarProvider>
    );
};

export default Layout;
