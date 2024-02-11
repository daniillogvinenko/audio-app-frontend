import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./MyMusic.module.scss";
import { MyPlaylistsList } from "@/widgets/MyPlaylistsList";

export const MyMusic = () => {
    return (
        <div className={classNames(classes.MyMusic, {}, [])}>
            <div className={classes.title}>My Playlists</div>
            <MyPlaylistsList />
        </div>
    );
};
