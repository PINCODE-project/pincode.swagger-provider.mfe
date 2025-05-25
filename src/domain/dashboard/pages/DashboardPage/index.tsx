import { useUnit } from "effector-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { $profile } from "@store/auth/profile";
import { Typography } from "@components/Typography";
import { $workspaces, getWorkspacesFx } from "@store/workspace/get-workspace";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from "@pin-code/uikit.lib";
import { WorkspaceRouter } from "@router/constants.ts";
import { setIsOpenCreateWorkspace } from "@store/workspace/create-workspace.ts";

const DashboardPage = () => {
    const profile = useUnit($profile);
    const [workspaces, getWorkspaces, isLoading] = useUnit([$workspaces, getWorkspacesFx, getWorkspacesFx.pending]);

    useEffect(() => {
        getWorkspaces();
    }, [getWorkspaces]);

    return (
        <div className="flex-1 p-10 pt-16 mx-auto w-full">
            <Typography.H3 className="mb-8">👋 {profile.displayName}, рады Вас видеть!</Typography.H3>

            <div className="mb-6 flex items-center justify-between">
                <Typography.H4>Ваши пространства</Typography.H4>
                <Button onClick={() => setIsOpenCreateWorkspace(true)}>Создать пространство</Button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2 mt-2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4 mt-2" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {workspaces && workspaces.length > 0 ? (
                        workspaces.map((workspace) => (
                            <Card key={workspace.id}>
                                <CardHeader>
                                    <CardTitle>
                                        <Link
                                            to={WorkspaceRouter.WorkspacePage(workspace.id)}
                                            className="flex items-center gap-2 hover:underline"
                                        >
                                            {workspace.emoji || "🏢"} {workspace.name}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription>
                                        Создано: {new Date(workspace.createdAt).toLocaleDateString("ru-RU")}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {workspace.description || "Нет описания"}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full text-center">
                            <p className="text-sm text-muted-foreground">
                                У вас пока нет пространств. Создайте первое пространство.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
