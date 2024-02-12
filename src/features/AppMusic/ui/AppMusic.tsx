import { useStore } from "@/app/store/store";
import { useEffect, useRef } from "react";

export const AppMusic = () => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const currentSong = useStore((state) => state.appMusic.currentSong);
    const isPlaying = useStore((state) => state.appMusic.isPlaying);
    const setIsPlaying = useStore((state) => state.appMusicActions.setIsPlaying);
    const setCurrentSongTime = useStore((state) => state.appMusicActions.setCurrentSongTime);
    const externalNewSongTime = useStore((state) => state.appMusic.externalNewSongTime);
    const setExternalNewSongTime = useStore((state) => state.appMusicActions.setExternalNewSongTime);

    // этот useEffect реагирует на изменения isPlaying и взаимодействует с тегом <audio>
    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (externalNewSongTime !== null) {
            setCurrentSongTime(externalNewSongTime);
            if (audioRef.current) {
                audioRef.current!.currentTime = externalNewSongTime;
            }
            setExternalNewSongTime(null);
        }
    }, [externalNewSongTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSongTime(audioRef.current?.currentTime || 0);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <audio onEnded={() => setIsPlaying(false)} ref={audioRef}>
            <source src={currentSong.source} />
        </audio>
    );
};
