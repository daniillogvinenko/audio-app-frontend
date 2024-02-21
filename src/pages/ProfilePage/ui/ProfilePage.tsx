import { classNames } from "@/shared/lib/classNames/classNames";
import { PageTitle } from "@/shared/ui/PageTitle";
import classes from "./ProfilePage.module.scss";
import { useStore } from "@/app/store/store";
import { Button } from "@/shared/ui/Button";
import { LOCALSTORAGE_USER } from "@/shared/const/const";

export const ProfilePage = () => {
    const username = useStore((state) => state.User.username);

    const setUserId = useStore((state) => state.UserActions.setId);
    const setUserPlaylists = useStore((state) => state.UserActions.setPlaylists);
    const setUsername = useStore((state) => state.UserActions.setUsername);

    const setIsPlaying = useStore((state) => state.appMusicActions.setIsPlaying);

    const handleLogout = () => {
        setUserId("");
        setUserPlaylists([]);
        setUsername("");
        setIsPlaying(false);
        localStorage.removeItem(LOCALSTORAGE_USER);
    };

    return (
        <div className={classNames(classes.ProfilePage, {}, [])}>
            <div className="container">
                <PageTitle title="My Profile" />
                <div className={classes.username}>{username}</div>
                <Button onClick={handleLogout} className={classes.logoutBtn}>
                    Log Out
                </Button>
            </div>
        </div>
    );
};
