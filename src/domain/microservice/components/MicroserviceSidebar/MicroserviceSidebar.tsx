import { Sheet, SheetContent, SheetHeader, SheetTitle, useToast } from "@pin-code/uikit.lib";
import { CreateMicroserviceDto } from "@model/index";
import { createMicroserviceFx } from "@store/microservice/create-microservice";

import { Form } from "./Form";

type Props = {
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    isCreating?: boolean;
};

export const MicroserviceSidebar = ({ isOpen, setIsOpen, isCreating = false }: Props) => {
    const { toast } = useToast();

    const createMicroservice = (data: CreateMicroserviceDto) => {
        createMicroserviceFx(data)
            .then(() => {
                setIsOpen(false);
                toast({ id: "successCreateMicroservice", title: "Микросервис успешно создан!" });
            })
            .catch(() => {
                toast({
                    id: "failedCreateMicroservice",
                    title: "Ошибка при создании микросервиса!",
                    variant: "destructive",
                });
            });
    };

    const onSubmit = async (data: CreateMicroserviceDto) => {
        if (isCreating) {
            createMicroservice(data);
        } else {
            throw new Error("Not implement");
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{isCreating ? "Создание" : "Изменение"} микросервиса</SheetTitle>
                </SheetHeader>
                <Form onSubmit={onSubmit} submitButtonText={isCreating ? "Создать" : "Сохранить"} />
            </SheetContent>
        </Sheet>
    );
}; 