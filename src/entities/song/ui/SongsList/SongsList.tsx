import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./SongsList.module.scss";
import { ISong, SongItem } from "@/entities/song";

interface SongsListProps {
    className?: string;
    songs: ISong[];
}

export const SongsList = (props: SongsListProps) => {
    const { className, songs } = props;

    return (
        <div className={classNames(classes.SongsList, {}, [className])}>
            {songs.map((song) => (
                <SongItem className={classes.item} key={song.id} song={song} />
            ))}
        </div>
    );
};
