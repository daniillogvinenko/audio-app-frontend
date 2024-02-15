import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./SongsList.module.scss";
import { ISong, SongItem } from "@/entities/song";

interface SongsListProps {
    className?: string;
    songs: ISong[];
    onClick: (value: ISong) => void;
}

export const SongsList = (props: SongsListProps) => {
    const { className, songs, onClick } = props;

    return (
        <div className={classNames(classes.SongsList, {}, [className])}>
            {songs.map((song) => (
                <SongItem onClick={onClick} className={classes.item} key={song.id} song={song} />
            ))}
        </div>
    );
};
