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
    play: () => void;
    playNew: (value: ISong) => void;
    pause: () => void;
    // НУЖНО СДЕЛАТЬ РЕФАКТОРИНГ. Этот компонент должен принимать не один колбек onClick, а три разные колбека, т.к. можно выполнить 3 разные действия:
    // 1. Выбрать песню
    // 2. Остановить песню (уже выбранную)
    // 3. Включить песню (уже выбранную)
}

export const SongItem = (props: SongItemProps) => {
    const { song, className, pause, play, playNew } = props;

    const isPlaying = useStore((state) => state.appMusic.isPlaying);
    const currentSong = useStore((state) => state.appMusic.currentSong);

    const handleOnClick = () => {
        if (!isPlaying && song.id === currentSong.id) {
            console.log("play");
            play();
        } else if (song.id !== currentSong.id) {
            console.log("play", song.title);
            playNew(song);
        } else if (isPlaying && song.id === currentSong.id) {
            console.log("pause");
            pause();
        }
    };

    const thisSongIsCurrent = currentSong.id === song.id;

    const icon = thisSongIsCurrent ? (isPlaying ? pauseBtn : playBtnPurple) : playBtn;

    return (
        <div className={classNames(classes.SongItem, {}, [className])}>
            <div className={classes.left}>
                <img onClick={handleOnClick} src={icon} alt="" />
                <div>
                    <div className={thisSongIsCurrent ? classes.titlePurple : classes.title}>{song.title}</div>
                    <div className={classes.author}>{song.author}</div>
                </div>
            </div>
            <div className={classes.right}>{secondsToTime(song.duration)}</div>
        </div>
    );
};
