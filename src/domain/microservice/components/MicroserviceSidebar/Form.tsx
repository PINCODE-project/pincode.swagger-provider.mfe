import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Form as InternalForm,
    Textarea,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@pin-code/uikit.lib";
import { useEffect, useState } from "react";
import { CreateMicroserviceDto, CreateMicroserviceDtoType } from "@model/index";
import { useStore } from "effector-react";
import { $projects, getProjectsFx } from "@store/project/get-project";
import { $workspace } from "@store/workspace/get-workspace";

type Props = {
    defaultValues?: Partial<CreateMicroserviceDto>;
    onSubmit: (data: CreateMicroserviceDto) => void;
    submitButtonText: string;
};

const formSchema = z.object({
    name: z.string().min(2, "Минимальная длина - 2").max(50, "Максимальная длина - 50"),
    type: z.enum(["URL", "TEXT"] as const),
    content: z.string().min(1, "Поле обязательно для заполнения"),
    projectId: z.string().min(1, "Выберите проект"),
    isUpdateByGetScheme: z.boolean().default(false),
});

export const Form = ({ defaultValues, submitButtonText, onSubmit }: Props) => {
    const workspace = useStore($workspace);
    const projects = useStore($projects);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "TEXT",
            isUpdateByGetScheme: false,
            ...defaultValues,
        },
    });
    
    const type = form.watch("type");
    
    // Загружаем проекты при открытии формы
    useEffect(() => {
        if (workspace?.id) {
            getProjectsFx(workspace.id);
        }
    }, [workspace?.id]);

    return (
        <InternalForm {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField
                    control={form.control}
                    name="projectId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Проект</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите проект" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {projects?.map((project) => (
                                        <SelectItem key={project.id} value={project.id}>
                                            {project.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Тип</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите тип" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="TEXT">Текст</SelectItem>
                                    <SelectItem value="URL">Ссылка</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {type === "TEXT" ? "Содержимое" : "URL"}
                            </FormLabel>
                            <FormControl>
                                {type === "TEXT" ? (
                                    <Textarea {...field} rows={5} />
                                ) : (
                                    <Input {...field} placeholder="https://" />
                                )}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="isUpdateByGetScheme"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <input
                                    type="checkbox"
                                    checked={field.value}
                                    onChange={field.onChange}
                                    className="h-4 w-4 mt-1"
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Обновлять схему при получении
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                
                <div className="pt-4 grid">
                    <Button type="submit">{submitButtonText}</Button>
                </div>
            </form>
        </InternalForm>
    );
}; 