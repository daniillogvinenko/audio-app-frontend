import { classNames } from "@/shared/lib/classNames/classNames";
import { PageTitle } from "@/shared/ui/PageTitle";
import classes from "./ProfilePage.module.scss";
import { useStore } from "@/app/store/store";
import { Button } from "@/shared/ui/Button";
import { LOCALSTORAGE_USER } from "@/shared/const/const";
import { useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";

export const ProfilePage = () => {
    const username = useStore((state) => state.User.username);

    const setUserId = useStore((state) => state.UserActions.setId);
    const setUserPlaylists = useStore((state) => state.UserActions.setPlaylists);
    const setUsername = useStore((state) => state.UserActions.setUsername);

    const setIsPlaying = useStore((state) => state.appMusicActions.setIsPlaying);

    const navigate = useNavigate();

    const handleLogout = () => {
        setUserId("");
        setUserPlaylists([]);
        setUsername("");
        setIsPlaying(false);
        localStorage.removeItem(LOCALSTORAGE_USER);
        navigate("/login");
    };

    return (
        <div className={classNames(classes.ProfilePage, {}, [])}>
            <div className="container">
                <PageTitle title="My Profile" />
                <div className={classes.username}>{username}</div>
                <ThemeSwitcher className={classes.switcher} />
                <Button onClick={handleLogout} className={classes.logoutBtn}>
                    Log Out
                </Button>
            </div>
        </div>
    );
};
