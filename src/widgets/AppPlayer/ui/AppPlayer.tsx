import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppPlayer.module.scss";
import { SongScale } from "@/features/SongScale";
import { useStore } from "@/app/store/store";
import prevImg from "@/shared/assets/images/Playback.svg";
import nextImg from "@/shared/assets/images/Next.svg";
import playImg from "@/shared/assets/images/Button_Play.svg";
import pauseImg from "@/shared/assets/images/Button_Pause.svg";
import axios from "axios";
import { AppImage } from "@/shared/ui/AppImage";
import { AppPlayerSkeleton } from "./AppPlayerSkeleton/AppPlayerSkeleton";
import { Skeleton } from "@/shared/ui/Skeleton";

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
    const setIsLoading = useStore((state) => state.appMusicActions.setIsLoading);
    const isLoading = useStore((state) => state.appMusic.isLoading);
    const nextQueue = useStore((state) => state.appMusic.nextQueue);
    const setNextQueue = useStore((state) => state.appMusicActions.setNextQueue);
    const prevQueue = useStore((state) => state.appMusic.prevQueue);
    const setPrevQueue = useStore((state) => state.appMusicActions.setPrevQueue);

    const onPlayPause = () => {
        if (!isLoading) {
            if (isPlaying) {
                setIsPlaying(false);
            } else {
                setIsPlaying(true);
            }
        }
    };

    // дает компоненту AppMusic знать о том, что надо перемотать песню на установленное значение
    const onChange = (value: number) => {
        // value: 0 - 100
        setExternalNewSongTime((currentSong.duration * value) / 100);
    };

    const onNext = () => {
        if (!isLoading) {
            setIsLoading(true);
            axios
                .get(`${__API__}/songs/${nextQueue[0]}`, {
                    headers: {
                        Authorization: __JWT__,
                    },
                })
                .then((response) => {
                    setCurrentSong(response.data);
                    setIsLoading(false);
                    // удаляем первый элемент из массива nextQueue и добавляем id текущей песни в конец массива prevQueue
                    setNextQueue(nextQueue.slice(1));
                    setPrevQueue([...prevQueue, currentSong.id]);
                });
        }
    };

    const onPrev = () => {
        if (!isLoading) {
            setIsLoading(true);

            axios
                .get(`${__API__}/songs/${prevQueue[prevQueue.length - 1]}`, {
                    headers: {
                        Authorization: __JWT__,
                    },
                })
                .then((response) => {
                    setCurrentSong(response.data);
                    setIsLoading(false);
                    setNextQueue([currentSong.id, ...nextQueue]);
                    setPrevQueue(prevQueue.slice(0, -1));
                });
        }
    };

    return (
        <div className={classNames(classes.AppPlayer, {}, [className])}>
            {isLoading ? (
                <AppPlayerSkeleton />
            ) : (
                <>
                    <AppImage
                        src={`${__API__}/images/${currentSong.img}`}
                        className={classes.albumCover}
                        fallback={<Skeleton className={classes.albumCover} height={243} width={243} />}
                    />

                    <SongScale
                        onChange={onChange}
                        value={(currentTime / currentSong.duration) * 100}
                        currentTime={currentSongTime}
                        duration={currentSong.duration}
                        className={classes.scale}
                    />
                    <div className={classes.songTitle}>{currentSong.title}</div>
                    <div className={classes.songAuthor}>{currentSong.author}</div>
                </>
            )}
            <div className={classes.controls}>
                <button disabled={isLoading} onClick={onPrev}>
                    <img src={prevImg} alt="" />
                </button>
                <button onClick={onPlayPause}>{<img src={isPlaying ? pauseImg : playImg} alt="" />}</button>
                <button disabled={isLoading} onClick={onNext}>
                    <img src={nextImg} alt="" />
                </button>
            </div>
        </div>
    );
};
