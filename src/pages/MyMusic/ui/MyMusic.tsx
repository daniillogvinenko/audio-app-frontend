import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./MyMusic.module.scss";
import { MyPlaylistsList } from "@/widgets/MyPlaylistsList";
import { PageTitle } from "@/shared/ui/PageTitle";

export const MyMusic = () => {
    return (
        <div className={classNames(classes.MyMusic, {}, [])}>
            <PageTitle title="My Playlists" />
            <MyPlaylistsList />
        </div>
    );
};
