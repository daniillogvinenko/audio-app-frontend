import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppPlayer.module.scss";
import { SongScale } from "@/features/SongScale";
import { useStore } from "@/app/store/store";
import testSong from "@/shared/assets/audio/Kid Cudi - Day 'N' Nite.mp3";
import prevImg from "@/shared/assets/images/Playback.png";
import nextImg from "@/shared/assets/images/Next.png";
import playImg from "@/shared/assets/images/Button_Play.png";
import pauseImg from "@/shared/assets/images/Button_Pause.png";
import { useEffect, useRef } from "react";

interface AppPlayerProps {
    className?: string;
}

const mockFetchedData = {
    img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
    title: "Day 'N' Nite",
    author: "Kid Cudi",
    source: testSong,
};

export const AppPlayer = (props: AppPlayerProps) => {
    const { className } = props;

    const currentTime = useStore((state) => state.appPlayer.currentSongTime);
    const setCurrentTime = useStore((state) => state.appPlayerActions.setCurrentSongTime);
    const setIsPlaying = useStore((state) => state.appPlayerActions.setIsPlaying);

    const audioRef = useRef<HTMLAudioElement>(null);

    const onPlayPause = () => {
        if (audioRef.current?.paused) {
            audioRef.current?.play();
            setIsPlaying(true);
        } else {
            audioRef.current?.pause();
            setIsPlaying(false);
        }
    };

    const onChange = (value: number) => {
        // value: 0 - 100
        setCurrentTime(value);
        audioRef.current!.currentTime = (audioRef.current!.duration * value) / 100;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (audioRef.current) {
                setCurrentTime((audioRef.current?.currentTime / audioRef.current?.duration) * 100);
                console.log((audioRef.current?.currentTime / audioRef.current?.duration) * 100);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={classNames(classes.AppPlayer, {}, [className])}>
            <div style={{ background: `url(${mockFetchedData.img}) center/cover` }} className={classes.albumCover} />
            <audio ref={audioRef}>
                <source src={mockFetchedData.source} />
            </audio>
            <SongScale
                onChange={onChange}
                value={currentTime}
                currentTime={audioRef.current?.currentTime || 0}
                duration={audioRef.current?.duration || 0}
                className={classes.scale}
            />
            <div className={classes.songTitle}>{mockFetchedData.title}</div>
            <div className={classes.songAuthor}>{mockFetchedData.author}</div>
            <div className={classes.controls}>
                <button>
                    <img src={prevImg} alt="" />
                </button>
                <button onClick={onPlayPause}>
                    {<img src={audioRef.current?.paused ? playImg : pauseImg} alt="" />}
                </button>
                <button>
                    <img src={nextImg} alt="" />
                </button>
            </div>
        </div>
    );
};
