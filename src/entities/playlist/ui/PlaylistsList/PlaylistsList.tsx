import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./PlaylistsList.module.scss";
import { IPlaylist } from "@/entities/playlist";
import { PlaylistItem } from "../PlaylistItem/PlaylistItem";

interface MyPlaylistsListProps {
    className?: string;
    playlists: IPlaylist[];
}

export const PlaylistsList = (props: MyPlaylistsListProps) => {
    const { className, playlists } = props;

    return (
        <div className={classNames(classes.MyPlaylistsList, {}, [className])}>
            {playlists.map((playlist) => (
                <PlaylistItem className={classes.item} playlist={playlist} key={playlist.id} />
            ))}
        </div>
    );
};
