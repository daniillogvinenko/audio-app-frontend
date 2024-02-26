import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./SongsList.module.scss";
import { ISong, SongItem } from "@/entities/song";

// play - если песня на которую нажимает пользователь выбрана, но на паузе -> setIsPlaying(true)
// pause - если песня на которую нажимает пользователь выбрана и проигрывается -> setIsPlaying(false)
// playNew - если песня на которую нажимает пользователь не выбрана -> то надо установить новую песню
interface SongsListProps {
    className?: string;
    songs: ISong[];
    play: () => void;
    playNew: (value: ISong) => void;
    pause: () => void;
}

export const SongsList = (props: SongsListProps) => {
    const { className, songs, pause, play, playNew } = props;

    return (
        <div className={classNames(classes.SongsList, {}, [className])}>
            {songs.map((song) => (
                <SongItem
                    pause={pause}
                    play={play}
                    playNew={playNew}
                    className={classes.item}
                    key={song.id}
                    song={song}
                />
            ))}
        </div>
    );
};
