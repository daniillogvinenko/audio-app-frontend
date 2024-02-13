import { useStore } from "@/app/store/store";
import axios from "axios";
import { useEffect, useRef } from "react";

export const AppMusic = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const currentSong = useStore((state) => state.appMusic.currentSong);
    const isPlaying = useStore((state) => state.appMusic.isPlaying);
    const setIsPlaying = useStore((state) => state.appMusicActions.setIsPlaying);
    const setCurrentSongTime = useStore((state) => state.appMusicActions.setCurrentSongTime);
    const externalNewSongTime = useStore((state) => state.appMusic.externalNewSongTime);
    const setExternalNewSongTime = useStore((state) => state.appMusicActions.setExternalNewSongTime);
    const setCurrentSong = useStore((state) => state.appMusicActions.setCurrentSong);

    // реагирует на изменения isPlaying и взаимодействует с тегом <audio>
    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    // реагирует на изменения externalNewSongTime, что говорит о том, что надо изменить текущее время песни через audioRef
    useEffect(() => {
        if (externalNewSongTime !== null) {
            setCurrentSongTime(externalNewSongTime);
            if (audioRef.current) {
                audioRef.current!.currentTime = externalNewSongTime;
            }
            setExternalNewSongTime(null);
        }
    }, [externalNewSongTime, setCurrentSongTime, setExternalNewSongTime]);

    useEffect(() => {
        audioRef.current?.load();
    }, [currentSong.id]);

    // устанавливает интервал, который проверять текущее время песни через audioRef и устанавливать его в стейт
    // а также делает запрос на сервер для получения первой песни
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSongTime(audioRef.current?.currentTime || 0);
        }, 1000);

        axios
            .get(`${__API__}/songs/1`, {
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzNjdiZDIyLWU1NDgtNDFmNC05YTcxLTg0ZjI5YjU0ZjA5OSIsImlhdCI6MTcwNzgzNTQ4MiwiZXhwIjoxNzA3ODcxNDgyfQ.dxpXQ_WWTlyX6O5QtiSE0rMdRqAf8wgdIv-feqRurY4",
                },
            })
            .then((response) => setCurrentSong(response.data));

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <audio onEnded={() => setIsPlaying(false)} ref={audioRef} src={`${__API__}/audio/${currentSong.source}`} />;
};