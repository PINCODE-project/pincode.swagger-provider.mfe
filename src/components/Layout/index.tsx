import { SidebarProvider } from "@pin-code/uikit.lib";
import { AppSidebar } from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import { CSSProperties, FC } from "react";

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
        </SidebarProvider>
    );
};

export default Layout;
