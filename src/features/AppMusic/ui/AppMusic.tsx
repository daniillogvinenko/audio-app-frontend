import { useStore } from "@/app/store/store";
import { ISong } from "@/entities/song";
import axios from "axios";
import { useEffect, useRef } from "react";

export const AppMusic = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const setIsLoading = useStore((state) => state.appMusicActions.setIsLoading);
    const currentSong = useStore((state) => state.appMusic.currentSong);
    const isPlaying = useStore((state) => state.appMusic.isPlaying);
    const setIsPlaying = useStore((state) => state.appMusicActions.setIsPlaying);
    const setCurrentSongTime = useStore((state) => state.appMusicActions.setCurrentSongTime);
    const externalNewSongTime = useStore((state) => state.appMusic.externalNewSongTime);
    const setExternalNewSongTime = useStore((state) => state.appMusicActions.setExternalNewSongTime);
    const setCurrentSong = useStore((state) => state.appMusicActions.setCurrentSong);
    const nextQueue = useStore((state) => state.appMusic.nextQueue);
    const prevQueue = useStore((state) => state.appMusic.prevQueue);
    const setNextQueue = useStore((state) => state.appMusicActions.setNextQueue);
    const setPrevQueue = useStore((state) => state.appMusicActions.setPrevQueue);

    // реагирует на изменения isPlaying и взаимодействует с тегом <audio>
    useEffect(() => {
        console.log(isPlaying);
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

    // реагирует на переключение песни -> загружает песню, а также воспроизводит её, если не стоит пауза
    useEffect(() => {
        audioRef.current?.load();
        if (isPlaying) {
            audioRef.current?.play();
        }
    }, [currentSong.id]);

    // устанавливает интервал, который проверять текущее время песни через audioRef и устанавливать его в стейт
    // а также делает запрос на сервер для получения первой песни
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSongTime(audioRef.current?.currentTime || 0);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleEnded = () => {
        if (nextQueue.length) {
            setIsLoading(true);
            axios.get<ISong>(`${__API__}/songs/${nextQueue[0]}`).then((response) => {
                setCurrentSong(response.data);
                setIsLoading(false);
                // удаляем первый элемент из массива nextQueue и добавляем id текущей песни в конец массива prevQueue
                setNextQueue(nextQueue.slice(1));
                setPrevQueue([...prevQueue, currentSong.id]);
            });
        } else {
            setIsPlaying(false);
        }
    };

    return <audio onEnded={handleEnded} ref={audioRef} src={`${__API__}/audio/${currentSong.source}`} />;
};
