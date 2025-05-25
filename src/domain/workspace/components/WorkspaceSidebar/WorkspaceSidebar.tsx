import { Sheet, SheetContent, SheetHeader, SheetTitle, useToast } from "@pin-code/uikit.lib";
import { CreateWorkspaceDto } from "@model/index";
import { createWorkspaceFx } from "@store/workspace/create-workspace.ts";

import { Form } from "./Form";

type Props = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    isCreating?: boolean;
};

export const WorkspaceSidebar = ({ isOpen, setIsOpen, isCreating = false }: Props) => {
    const { toast } = useToast();

    const createWorkspace = (data: CreateWorkspaceDto) => {
        createWorkspaceFx(data)
            .then(() => {
                setIsOpen(false);
                toast({ id: "successCreateWorkspace", title: "Рабочее пространство успешно создано!" });
            })
            .catch(() => {
                toast({
                    id: "failedCreateWorkspace",
                    title: "Ошибка при создании пространства!",
                    variant: "destructive",
                });
            });
    };

    const onSubmit = async (data: CreateWorkspaceDto) => {
        if (isCreating) {
            createWorkspace(data);
        } else {
            throw new Error("Not implement");
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{isCreating ? "Создание" : "Изменение"} пространства</SheetTitle>
                </SheetHeader>
                <Form onSubmit={onSubmit} submitButtonText={isCreating ? "Создать" : "Сохранить"} />
            </SheetContent>
        </Sheet>
    );
};
