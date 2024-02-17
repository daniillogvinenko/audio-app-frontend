import { classNames } from "@/shared/lib/classNames/classNames";
import { PageTitle } from "@/shared/ui/PageTitle";
import classes from "./ProfilePage.module.scss";

export const ProfilePage = () => {
    return (
        <div className={classNames(classes.ProfilePage, {}, [])}>
            <div className="container">
                <PageTitle title="My Profile" />
            </div>
        </div>
    );
};
