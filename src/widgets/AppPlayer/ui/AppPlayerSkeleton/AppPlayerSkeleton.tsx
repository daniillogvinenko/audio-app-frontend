import classes from "./AppPlayerSkeleton.module.scss";
import { Skeleton } from "@/shared/ui/Skeleton";

export const AppPlayerSkeleton = () => {
    return (
        <div className={classes.AppPlayerSkeleton}>
            <Skeleton className={classes.albumCover} height={243} width={243} />

            <div className={classes.songInfo}>
                <Skeleton className={classes.scale} height={20} border="30px" />
                <Skeleton className={classes.songTitle} height={20} border="30px" />
                <Skeleton className={classes.songAuthor} height={22} border="30px" />
            </div>
        </div>
    );
};
