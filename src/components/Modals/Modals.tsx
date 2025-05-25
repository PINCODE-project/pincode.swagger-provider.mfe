import { WorkspaceSidebar } from "@domain/workspace/components/WorkspaceSidebar";
import { $isOpenCreateWorkspace, setIsOpenCreateWorkspace } from "@store/workspace/create-workspace.ts";
import { useUnit } from "effector-react";

export const Modals = () => {
    const isOpenCreateWorkspace = useUnit($isOpenCreateWorkspace);
    return (
        <>
            <WorkspaceSidebar isOpen={isOpenCreateWorkspace} setIsOpen={setIsOpenCreateWorkspace} isCreating={true} />
        </>
    );
};
