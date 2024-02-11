import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./SongScale.module.scss";
import { useMemo } from "react";
import { secondsToTime } from "@/shared/lib/formatTime/formatTime";

interface SongScaleProps {
    className?: string;
    value: number;
    onChange: (value: number) => void;
    duration: number;
    currentTime: number;
}

export const SongScale = (props: SongScaleProps) => {
    const { className, onChange, value, currentTime, duration } = props;

    const currentFormatted = secondsToTime(currentTime);

    const durationFormatted = useMemo(() => {
        return secondsToTime(duration);
    }, [duration]);

    return (
        <div className={classNames(classes.SongScale, {}, [className])}>
            <div className={classes.time}>
                <div>{currentFormatted}</div>
                <div>{durationFormatted}</div>
            </div>
            <input
                value={value}
                onChange={(e) => onChange(+e.target.value)}
                type="range"
                className={classes.rangeInput}
            />
        </div>
    );
};
