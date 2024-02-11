import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./AppPlayer.module.scss";
import { SongScale } from "@/features/SongScale";

interface AppPlayerProps {
    className?: string;
}

const mockFetchedData = {
    img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
};

export const AppPlayer = (props: AppPlayerProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.AppPlayer, {}, [className])}>
            <div style={{ background: `url(${mockFetchedData.img}) center/cover` }} className={classes.albumCover} />
            <SongScale className={classes.scale} />
        </div>
    );
};
