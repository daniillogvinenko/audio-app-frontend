import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppPlayer.module.scss";
import { SongScale } from "@/features/SongScale";
import { useStore } from "@/app/store/store";
import prevImg from "@/shared/assets/images/Playback.png";
import nextImg from "@/shared/assets/images/Next.png";
import playImg from "@/shared/assets/images/Button_Play.png";
import pauseImg from "@/shared/assets/images/Button_Pause.png";
import { useEffect } from "react";
import axios from "axios";

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
    const setCurrentSong = useStore((state) => state.appMusicActions.setCurrentSong);
    const setExternalNewSongTime = useStore((state) => state.appMusicActions.setExternalNewSongTime);

    const onPlayPause = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/songs/${1}`, {
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzNjdiZDIyLWU1NDgtNDFmNC05YTcxLTg0ZjI5YjU0ZjA5OSIsImlhdCI6MTcwNzc0MzgxOCwiZXhwIjoxNzA3Nzc5ODE4fQ.5PMZEfCpq2Ap9dvhYGTqHdoWYQNkUbWdET7_ewV6DcU",
                },
            })
            .then((response) => setCurrentSong(response.data));
    }, []);

    // дает компоненту AppMusic знать о том, что надо перемотать песню на установленное значение
    const onChange = (value: number) => {
        // value: 0 - 100
        setExternalNewSongTime((currentSong.duration * value) / 100);
    };

    const onNext = () => {
        axios
            .get(`http://localhost:8000/songs/${2}`, {
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzNjdiZDIyLWU1NDgtNDFmNC05YTcxLTg0ZjI5YjU0ZjA5OSIsImlhdCI6MTcwNzc0MzgxOCwiZXhwIjoxNzA3Nzc5ODE4fQ.5PMZEfCpq2Ap9dvhYGTqHdoWYQNkUbWdET7_ewV6DcU",
                },
            })
            .then((response) => setCurrentSong(response.data));
    };

    console.log(currentSong.img);

    return (
        <div className={classNames(classes.AppPlayer, {}, [className])}>
            <img src={`${__API__}/images/${currentSong.img}`} className={classes.albumCover} />

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
                <button onClick={onNext}>
                    <img src={nextImg} alt="" />
                </button>
            </div>
        </div>
    );
};
