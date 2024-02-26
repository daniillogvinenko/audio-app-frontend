import { useStore } from "@/app/store/store";
import { ISong } from "@/entities/song";
import { axiosApi } from "@/shared/api/api";
import { LOCALSTORAGE_USER } from "@/shared/const/const";
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
    const userId = useStore((state) => state.User.id);
    const setUserId = useStore((state) => state.UserActions.setId);
    const setUserPlaylists = useStore((state) => state.UserActions.setPlaylists);
    const setUsername = useStore((state) => state.UserActions.setUsername);

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

    useEffect(() => {
        if (!userId && localStorage.getItem(LOCALSTORAGE_USER)) {
            axiosApi
                .get<{ id: string; username: string; playlists: string[] }[]>(
                    `/users?id=${localStorage.getItem(LOCALSTORAGE_USER)}`
                )
                .then((response) => {
                    const { id, playlists, username } = response.data[0];
                    setUserId(id);
                    setUserPlaylists(playlists);
                    setUsername(username);
                });
        }
    }, [userId, setUserId, setUserPlaylists, setUsername]);

    const handleEnded = () => {
        if (nextQueue.length) {
            setIsLoading(true);
            axiosApi.get<ISong>(`${__API__}/songs/${nextQueue[0]}`).then((response) => {
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
