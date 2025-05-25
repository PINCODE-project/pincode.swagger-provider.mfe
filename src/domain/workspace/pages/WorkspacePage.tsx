import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectSidebar } from "@domain/project";
import { useUnit } from "effector-react";
import { $workspace, getWorkspaceFx } from "@store/workspace/get-workspace.ts";

import { Typography } from "@/components/Typography";

const WorkspacePage = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();

    const [getWorkspace, isLoadingWorkspace] = useUnit([getWorkspaceFx, getWorkspaceFx.pending]);
    const workspace = useUnit($workspace);
    const [isOpenCreateProject, setIsOpenCreateProject] = useState<boolean>(false);

    useEffect(() => {
        if (!workspaceId) return;
        getWorkspaceFx(workspaceId);
    }, [getWorkspace, workspaceId]);

    return (
        <div className="flex-1 p-10 pt-16 mx-auto w-full">
            <Typography.H3 className="mb-8">
                {workspace?.emoji} {workspace?.name}
            </Typography.H3>

            <p>Выберете схему слева</p>

            <ProjectSidebar
                isCreating={true}
                isOpen={isOpenCreateProject}
                setIsOpen={setIsOpenCreateProject}
                workspaceId={workspaceId ?? ""}
            />
        </div>
    );
};

export default WorkspacePage;
