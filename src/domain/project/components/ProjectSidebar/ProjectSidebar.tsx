import { Sheet, SheetContent, SheetHeader, SheetTitle, useToast } from "@pin-code/uikit.lib";
import { Dispatch, SetStateAction } from "react";
import { CreateProjectDto } from "@model/index";
import { createProjectFx } from "@store/project/get-project";

import { Form } from "./Form";

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isCreating?: boolean;
    workspaceId: string;
};

export const ProjectSidebar = ({ isOpen, setIsOpen, isCreating = false, workspaceId }: Props) => {
    const { toast } = useToast();

    const createProject = (data: CreateProjectDto) => {
        createProjectFx(data)
            .then(() => {
                setIsOpen(false);
                toast({ id: "successCreateWorkspace", title: "Проект успешно создан!" });
            })
            .catch(() => {
                toast({
                    id: "failedCreateWorkspace",
                    title: "Ошибка при создании проекта!",
                    variant: "destructive",
                });
            });
    };

    const onSubmit = (data: CreateProjectDto) => {
        if (isCreating) {
            createProject(data);
        } else {
            throw new Error("Not implement");
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
