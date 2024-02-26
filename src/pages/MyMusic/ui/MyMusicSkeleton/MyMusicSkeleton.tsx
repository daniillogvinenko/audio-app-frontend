import { classNames } from "@/shared/lib/classNames/classNames";
import { Skeleton } from "@/shared/ui/Skeleton";
import classes from "./MyMysicSkeleton.module.scss";

const SkeletonItem = () => (
    <div className={classNames(classes.PlaylistItem, {}, [])}>
        <Skeleton className={classes.img} width={134} height={134} border="10px" />
        <Skeleton height={30} border="10px" />
    </div>
);

export const MyMusicSkeleton = () => (
    <div>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
    </div>
);
