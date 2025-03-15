import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@pin-code/uikit.lib";
import { PropsWithChildren, useState } from "react";
import { CreateWorkspaceDto } from "@model/index";
import { createWorkspaceFx } from "@store/workspace/get-workspace";

import { Form } from "./Form";

type Props = PropsWithChildren & {
    isCreating?: boolean;
};

export const WorkSpaceSidebar = ({ isCreating = false, children }: Props) => {
    const [open] = useState(true);

    const onSubmit = (data: CreateWorkspaceDto) => {
        if (isCreating) {
            createWorkspaceFx(data);
        } else {
            throw new Error("Not implement");
        }
    };

    return (
        <Sheet open={open}>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{isCreating ? "Создание" : "Изменение"} пространства</SheetTitle>
                </SheetHeader>
                <Form onSubmit={onSubmit} submitButtonText={isCreating ? "Создать" : "Сохранить"} />
            </SheetContent>
        </Sheet>
    );
};
