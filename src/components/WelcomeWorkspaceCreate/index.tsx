import { Typography } from "@components/Typography";
import { useUnit } from "effector-react";
import { $profile } from "@store/auth/profile";

const WelcomeWorkspaceCreate = () => {
    const profile = useUnit($profile);

    return (
        <>
            <Typography.H3>👋 {profile.displayName}, рады Вас видеть!</Typography.H3>
        </>
    );
};

export default WelcomeWorkspaceCreate;
