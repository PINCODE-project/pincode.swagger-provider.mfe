import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
    Button,
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage, 
    Input, 
    Form as InternalForm 
} from "@pin-code/uikit.lib"
import { useState } from "react"

import { CreateWorkspaceDto } from "@model";
import { EmojiSelect } from "@components/EmojiSelect"

type Props = {
    defaultValues?: CreateWorkspaceDto;
    onSubmit: (data: CreateWorkspaceDto) => void;
    submitButtonText: string;
}

const formSchema = z.object({
    name: z.string().min(2, "Минимальная длина - 2").max(50, "Максимальная длина - 50"),
    emoji: z.string().min(1, "Введите emoji"),
    description: z.string().min(2, "Минимальная длина - 2").max(50, "Максимальная длина - 50"),
})

export const Form = ({
    defaultValues,
    submitButtonText
}: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
      })

    const [open, setOpen] = useState(false);

    return (
        <InternalForm {...form}>
            <form onSubmit={form.handleSubmit(console.log)} className="grid gap-4 py-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="emoji"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Emoji</FormLabel>
                            <FormControl>
                                <EmojiSelect 
                                    value={field.value} 
                                    handleChange={(value) => {
                                        console.log(value)
                                        console.log(value)
                                        field.onChange(value)
                                        setOpen(false)
                                    }}
                                    open={open}
                                    setOpen={setOpen}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Описание</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="pt-4 grid">
                    <Button type="submit">{submitButtonText}</Button>
                </div>
            </form>
        </InternalForm>
    )
}