import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./SongItem.module.scss";
import playBtn from "@/shared/assets/images/Playlist_play_button.png";
import playBtnPurple from "@/shared/assets/images/Button_Play_purple.png";
import pauseBtn from "@/shared/assets/images/Playlist_pause_button.png";
import { secondsToTime } from "@/shared/lib/formatTime/formatTime";
import { ISong } from "../..";
import { useStore } from "@/app/store/store";

interface SongItemProps {
    song: ISong;
    className?: string;
    onClick: (value: ISong) => void;
}

export const SongItem = (props: SongItemProps) => {
    const { song, className, onClick } = props;

    const isPlaying = useStore((state) => state.appMusic.isPlaying);
    const currentSong = useStore((state) => state.appMusic.currentSong);

    const handleOnClick = () => {
        onClick(song);
    };

    const thisSongIsCurrent = currentSong.id === song.id;

    return (
        <div className={classNames(classes.SongItem, {}, [className])}>
            <div className={classes.left}>
                <img
                    onClick={handleOnClick}
                    src={thisSongIsCurrent ? (isPlaying ? pauseBtn : playBtnPurple) : playBtn}
                    alt=""
                />
                <div>
                    <div className={thisSongIsCurrent ? classes.titlePurple : classes.title}>{song.title}</div>
                    <div className={classes.author}>{song.author}</div>
                </div>
            </div>
            <div className={classes.right}>{secondsToTime(song.duration)}</div>
        </div>
    );
};
