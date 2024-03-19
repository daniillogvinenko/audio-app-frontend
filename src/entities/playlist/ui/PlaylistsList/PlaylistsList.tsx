import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./PlaylistsList.module.scss";
import { IPlaylist } from "@/entities/playlist";
import { PlaylistItem } from "../PlaylistItem/PlaylistItem";
import { useStore } from "@/app/store/store";

interface MyPlaylistsListProps {
    className?: string;
    playlists: IPlaylist[];
}

export const PlaylistsList = (props: MyPlaylistsListProps) => {
    const { className, playlists } = props;
    const currentPlaylistTitle = useStore((state) => state.appMusic.currentPlaylistTitle);

    return (
        <div className={classNames(classes.PlaylistsList, {}, [className])}>
            {playlists.map((playlist) => (
                <PlaylistItem
                    isActive={currentPlaylistTitle === playlist.title}
                    className={classes.item}
                    playlist={playlist}
                    key={playlist.id}
                />
            ))}
        </div>
    );
};
