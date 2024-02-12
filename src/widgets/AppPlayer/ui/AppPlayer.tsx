import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppPlayer.module.scss";
import { SongScale } from "@/features/SongScale";
import { useStore } from "@/app/store/store";
import prevImg from "@/shared/assets/images/Playback.png";
import nextImg from "@/shared/assets/images/Next.png";
import playImg from "@/shared/assets/images/Button_Play.png";
import pauseImg from "@/shared/assets/images/Button_Pause.png";

interface AppPlayerProps {
    className?: string;
}

export const AppPlayer = (props: AppPlayerProps) => {
    const { className } = props;

    const currentTime = useStore((state) => state.appMusic.currentSongTime);
    const isPlaying = useStore((state) => state.appMusic.isPlaying);
    const setIsPlaying = useStore((state) => state.appMusicActions.setIsPlaying);
    const currentSongTime = useStore((state) => state.appMusic.currentSongTime);
    const currentSong = useStore((state) => state.appMusic.currentSong);
    const setExternalNewSongTime = useStore((state) => state.appMusicActions.setExternalNewSongTime);

    const onPlayPause = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    };

    const onChange = (value: number) => {
        // value: 0 - 100
        setExternalNewSongTime((currentSong.duration * value) / 100);
    };

    return (
        <div className={classNames(classes.AppPlayer, {}, [className])}>
            <div style={{ background: `url(${currentSong.img}) center/cover` }} className={classes.albumCover} />

            <SongScale
                onChange={onChange}
                value={(currentTime / currentSong.duration) * 100}
                currentTime={currentSongTime}
                duration={currentSong.duration}
                className={classes.scale}
            />
            <div className={classes.songTitle}>{currentSong.title}</div>
            <div className={classes.songAuthor}>{currentSong.author}</div>
            <div className={classes.controls}>
                <button>
                    <img src={prevImg} alt="" />
                </button>
                <button onClick={onPlayPause}>{<img src={isPlaying ? pauseImg : playImg} alt="" />}</button>
                <button>
                    <img src={nextImg} alt="" />
                </button>
            </div>
        </div>
    );
};
