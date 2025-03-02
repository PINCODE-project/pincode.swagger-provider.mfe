import { useUnit } from "effector-react";
import { $profile } from "@store/auth/profile";
import { Typography } from "@components/Typography";

const DashboardPage = () => {
    const profile = useUnit($profile);

    return (
        <div className="flex-1 p-10 pt-16 mx-auto w-full">
            <Typography.H3>👋 {profile.displayName}, рады Вас видеть!</Typography.H3>
        </div>
    );
};

export default DashboardPage;
