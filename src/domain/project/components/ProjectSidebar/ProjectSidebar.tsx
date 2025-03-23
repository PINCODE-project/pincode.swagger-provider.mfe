import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@pin-code/uikit.lib";
import { PropsWithChildren, useState } from "react";
import { CreateProjectDto } from "@model/index";
import { createProjectFx } from "@store/project/get-project";

import { Form } from "./Form";

type Props = PropsWithChildren & {
    isCreating?: boolean;
    workspaceId: string;
};

export const ProjectSidebar = ({ isCreating = false, workspaceId, children }: Props) => {
    const [open] = useState(true);

    const onSubmit = (data: CreateProjectDto) => {
        if (isCreating) {
            createProjectFx(data);
        } else {
            throw new Error("Not implement");
        }
    };

    return (
        <Sheet open={open}>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{isCreating ? "Создание" : "Изменение"} проекта</SheetTitle>
                </SheetHeader>
                <Form
                    onSubmit={onSubmit}
                    workspaceId={workspaceId}
                    submitButtonText={isCreating ? "Создать" : "Сохранить"}
                />
            </SheetContent>
        </Sheet>
    );
};
