import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppPlayer.module.scss";
import { ProgressBar } from "@/features/ProgressBar";
import { useStore } from "@/app/store/store";
import prevImg from "@/shared/assets/images/Playback.svg";
import nextImg from "@/shared/assets/images/Next.svg";
import playImg from "@/shared/assets/images/Button_Play.svg";
import pauseImg from "@/shared/assets/images/Button_Pause.svg";
import { AppImage } from "@/shared/ui/AppImage";
import { AppPlayerSkeleton } from "../AppPlayerSkeleton/AppPlayerSkeleton";
import { Skeleton } from "@/shared/ui/Skeleton";
import { ToggleRandom } from "@/features/ToggleRandom";
import { axiosApi } from "@/shared/api/api";
import { timeToSeconds } from "@/shared/lib/formatTime/formatTime";

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
        // перевод из процентов в секунды
        setExternalNewSongTime((timeToSeconds(currentSong.duration) * value) / 100);
    };

    const onNext = () => {
        // кнопка не будет работать, если идет загрузка песни или следующих песен нету
        if (!isLoading && nextQueue.length) {
            setIsLoading(true);
            axiosApi.get(`/songs/${nextQueue[0]}`).then((response) => {
                setCurrentSong(response.data);
                setIsLoading(false);
                // удаляем первый элемент из массива nextQueue и добавляем id текущей песни в конец массива prevQueue
                setNextQueue(nextQueue.slice(1));
                setPrevQueue([...prevQueue, currentSong.id]);
            });
        }
    };

    const onPrev = () => {
        if (currentSongTime > 6) {
            setExternalNewSongTime(0);
        } else {
            // кнопка не будет работать, если идет загрузка песни или предыдущих песен нету
            if (!isLoading && prevQueue.length) {
                setIsLoading(true);
                const lastElementInPrevQueue = prevQueue[prevQueue.length - 1];
                axiosApi.get(`/songs/${lastElementInPrevQueue}`).then((response) => {
                    setCurrentSong(response.data);
                    setIsLoading(false);
                    setNextQueue([currentSong.id, ...nextQueue]);
                    setPrevQueue(prevQueue.slice(0, -1));
                });
            }
        }
    };

    const prevDisabled = isLoading || (!prevQueue.length && !(currentSongTime > 6));
    const nextDesabled = isLoading || !nextQueue.length;

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

                    <div className={classes.songInfo}>
                        <ProgressBar
                            onChange={onChange}
                            // перевод в проценты
                            value={(currentTime / timeToSeconds(currentSong.duration)) * 100}
                            currentTime={currentSongTime}
                            duration={timeToSeconds(currentSong.duration)}
                            className={classes.scale}
                        />
                        <div className={classes.songTitle}>{currentSong.title}</div>
                        <div className={classes.songAuthor}>{currentSong.author}</div>
                    </div>
                </>
            )}
            <div className={classes.controls}>
                <button disabled={prevDisabled} onClick={onPrev}>
                    <img src={prevImg} alt="" />
                </button>
                <button disabled={isLoading} onClick={onPlayPause}>
                    {<img src={isPlaying ? pauseImg : playImg} alt="" />}
                </button>
                <button disabled={nextDesabled} onClick={onNext}>
                    <img src={nextImg} alt="" />
                </button>
            </div>
            <ToggleRandom disabled={isLoading} />
        </div>
    );
};