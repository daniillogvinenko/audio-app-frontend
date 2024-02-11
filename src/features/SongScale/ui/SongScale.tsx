import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./SongScale.module.scss";

interface SongScaleProps {
    className?: string;
}

export const SongScale = (props: SongScaleProps) => {
    const { className } = props;

    return <div className={classNames(classes.SongScale, {}, [className])}>SongScale</div>;
};
