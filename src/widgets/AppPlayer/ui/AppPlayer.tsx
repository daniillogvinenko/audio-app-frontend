import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppPlayer.module.scss";
import { SongScale } from "@/features/SongScale";
import { useStore } from "@/app/store/store";
import prevImg from "@/shared/assets/images/Playback.png";
import nextImg from "@/shared/assets/images/Next.png";
import playImg from "@/shared/assets/images/Button_Play.png";
import pauseImg from "@/shared/assets/images/Button_Pause.png";
import { useState } from "react";
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

    const [n, SetN] = useState(1);

    // дает компоненту AppMusic знать о том, что надо перемотать песню на установленное значение
    const onChange = (value: number) => {
        // value: 0 - 100
        setExternalNewSongTime((currentSong.duration * value) / 100);
    };

    const onNext = () => {
        SetN(n + 1);
        setIsPlaying(false);
        axios
            .get(`${__API__}/songs/${n + 1}`, {
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzNjdiZDIyLWU1NDgtNDFmNC05YTcxLTg0ZjI5YjU0ZjA5OSIsImlhdCI6MTcwNzgzNTQ4MiwiZXhwIjoxNzA3ODcxNDgyfQ.dxpXQ_WWTlyX6O5QtiSE0rMdRqAf8wgdIv-feqRurY4",
                },
            })
            .then((response) => setCurrentSong(response.data));
    };

    const onPrev = () => {
        if (n >= 1) {
            SetN(n - 1);
            setIsPlaying(false);
            axios
                .get(`${__API__}/songs/${n - 1}`, {
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzNjdiZDIyLWU1NDgtNDFmNC05YTcxLTg0ZjI5YjU0ZjA5OSIsImlhdCI6MTcwNzgzNTQ4MiwiZXhwIjoxNzA3ODcxNDgyfQ.dxpXQ_WWTlyX6O5QtiSE0rMdRqAf8wgdIv-feqRurY4",
                    },
                })
                .then((response) => setCurrentSong(response.data));
        }
    };

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
                <button onClick={onPrev}>
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
