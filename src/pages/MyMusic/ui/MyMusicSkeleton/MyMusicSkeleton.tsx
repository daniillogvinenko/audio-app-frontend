import { classNames } from "@/shared/lib/classNames/classNames";
import { Skeleton } from "@/shared/ui/Skeleton";
import classes from "./MyMysicSkeleton.module.scss";

export const MyMusicSkeleton = () => {
    return (
        <div>
            <div className={classNames(classes.PlaylistItem, {}, [])}>
                <Skeleton className={classes.img} width={134} height={134} border="10px" />
                <Skeleton height={30} border="10px" />
            </div>
            <div className={classNames(classes.PlaylistItem, {}, [])}>
                <Skeleton className={classes.img} width={134} height={134} border="10px" />
                <Skeleton height={30} border="10px" />
            </div>
            <div className={classNames(classes.PlaylistItem, {}, [])}>
                <Skeleton className={classes.img} width={134} height={134} border="10px" />
                <Skeleton height={30} border="10px" />
            </div>
            <div className={classNames(classes.PlaylistItem, {}, [])}>
                <Skeleton className={classes.img} width={134} height={134} border="10px" />
                <Skeleton height={30} border="10px" />
            </div>
        </div>
    );
};
