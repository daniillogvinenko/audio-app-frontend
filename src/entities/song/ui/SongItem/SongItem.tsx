import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./SongItem.module.scss";
import playBtn from "@/shared/assets/images/Playlist_play_button.png";
import { secondsToTime } from "@/shared/lib/formatTime/formatTime";
import { ISong } from "../..";

interface SongItemProps {
    song: ISong;
    className?: string;
}

export const SongItem = (props: SongItemProps) => {
    const { song, className } = props;

    return (
        <div className={classNames(classes.SongItem, {}, [className])}>
            <div className={classes.left}>
                <img src={playBtn} alt="" />
                <div>
                    <div className={classes.title}>{song.title}</div>
                    <div className={classes.author}>{song.author}</div>
                </div>
            </div>
            <div className={classes.right}>{secondsToTime(song.duration)}</div>
        </div>
    );
};
