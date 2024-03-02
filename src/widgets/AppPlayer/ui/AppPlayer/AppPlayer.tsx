import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppPlayer.module.scss";
import { ProgressBar } from "@/features/ProgressBar";
import { useStore } from "@/app/store/store";
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
                <button className={classes.prevBtn} disabled={prevDisabled} onClick={onPrev}>
                    <svg width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.53875 14.0275L16.7887 25.2775C17.0025 25.425 17.25 25.5 17.5 25.5C17.6987 25.5 17.8975 25.4525 18.08 25.3575C18.4925 25.1413 18.75 24.715 18.75 24.25V1.75002C18.75 1.28502 18.4925 0.858775 18.08 0.642525C17.6688 0.425025 17.1712 0.457525 16.7887 0.721275L0.53875 11.9713C0.20125 12.2063 0 12.59 0 13C0 13.41 0.20125 13.7938 0.53875 14.0275Z" />
                        <path d="M15.5388 13.5285L31.7887 24.7785C32.0025 24.926 32.25 25.001 32.5 25.001C32.6987 25.001 32.8975 24.9535 33.08 24.8585C33.4925 24.6423 33.75 24.216 33.75 23.751V1.251C33.75 0.786001 33.4925 0.359751 33.08 0.143501C32.6688 -0.0739988 32.1712 -0.0414989 31.7887 0.222251L15.5388 11.4723C15.2013 11.7073 15 12.091 15 12.501C15 12.911 15.2013 13.2948 15.5388 13.5285Z" />
                    </svg>
                </button>
                <button disabled={isLoading} onClick={onPlayPause}>
                    {<img src={isPlaying ? pauseImg : playImg} alt="" />}
                </button>
                <button className={classes.nextBtn} disabled={nextDesabled} onClick={onNext}>
                    <svg width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.2113 11.4725L16.9613 0.222473C16.7475 0.0749731 16.5 -2.63036e-05 16.25 -2.63254e-05C16.0513 -2.63428e-05 15.8525 0.047474 15.67 0.142474C15.2575 0.358724 15 0.784974 15 1.24997L15 23.75C15 24.215 15.2575 24.6412 15.67 24.8575C16.0812 25.075 16.5788 25.0425 16.9613 24.7787L33.2113 13.5287C33.5488 13.2937 33.75 12.91 33.75 12.5C33.75 12.09 33.5488 11.7062 33.2113 11.4725Z" />
                        <path d="M18.2113 11.9715L1.96125 0.721497C1.7475 0.573997 1.5 0.498997 1.25 0.498997C1.05125 0.498997 0.852501 0.546497 0.670001 0.641497C0.257501 0.857747 2.11703e-06 1.284 2.07638e-06 1.749L1.09366e-07 24.249C6.87144e-08 24.714 0.257499 25.1402 0.669999 25.3565C1.08125 25.574 1.57875 25.5415 1.96125 25.2777L18.2113 14.0277C18.5488 13.7927 18.75 13.409 18.75 12.999C18.75 12.589 18.5488 12.2052 18.2113 11.9715Z" />
                    </svg>
                </button>
            </div>
            <ToggleRandom disabled={isLoading} />
        </div>
    );
};
