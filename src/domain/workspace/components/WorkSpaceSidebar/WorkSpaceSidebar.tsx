import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@pin-code/uikit.lib"
import { PropsWithChildren, useState } from "react"

import { Form } from "./Form"

type Props = PropsWithChildren & {
    isCreating?: boolean;
}

export const WorkSpaceSidebar = ({isCreating = false, children}: Props) => {
    const [open] = useState(true)

    return (
        <Sheet open={open} >
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>

            <SheetContent>
            <SheetHeader>
                <SheetTitle>
                    {isCreating ? "Создание" : "Изменение"} пространства
                </SheetTitle>
            </SheetHeader>
                <Form onSubmit={console.log} submitButtonText={isCreating ? "Создать" : "Сохранить"}/>
            </SheetContent>
        </Sheet>
    )
}