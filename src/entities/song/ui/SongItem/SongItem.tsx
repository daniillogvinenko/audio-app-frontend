import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./SongItem.module.scss";
import playBtn from "@/shared/assets/images/Playlist_play_button.png";
import pauseBtn from "@/shared/assets/images/Playlist_pause_button.png";
import { secondsToTime } from "@/shared/lib/formatTime/formatTime";
import { ISong } from "../..";
import { useStore } from "@/app/store/store";

interface SongItemProps {
    song: ISong;
    className?: string;
}

export const SongItem = (props: SongItemProps) => {
    const { song, className } = props;

    const setCurrentSong = useStore((state) => state.appMusicActions.setCurrentSong);
    const setIsPlaying = useStore((state) => state.appMusicActions.setIsPlaying);
    const currentSong = useStore((state) => state.appMusic.currentSong);

    const handleOnClick = () => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    return (
        <div className={classNames(classes.SongItem, {}, [className])}>
            <div className={classes.left}>
                <img onClick={handleOnClick} src={currentSong.id === song.id ? pauseBtn : playBtn} alt="" />
                <div>
                    <div className={classes.title}>{song.title}</div>
                    <div className={classes.author}>{song.author}</div>
                </div>
            </div>
            <div className={classes.right}>{secondsToTime(song.duration)}</div>
        </div>
    );
};
