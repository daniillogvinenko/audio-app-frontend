import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./PlaylistItem.module.scss";
import { IPlaylist } from "@/entities/playlist";
import { AppImage } from "@/shared/ui/AppImage";
import { NavLink } from "react-router-dom";
import { Skeleton } from "@/shared/ui/Skeleton";

interface PlaylistItemProps {
    playlist: IPlaylist;
    className?: string;
    isActive: boolean;
}

export const PlaylistItem = (props: PlaylistItemProps) => {
    const { playlist, className, isActive } = props;
    return (
        <NavLink to={`/playlist/${playlist.id}`}>
            <div className={classNames(classes.PlaylistItem, { [classes.isActive]: isActive }, [className])}>
                <AppImage
                    className={classes.img}
                    src={`${__API__}/playlistCovers/${playlist.imgSrc}`}
                    fallback={<Skeleton width={134} height={134} border="8px" />}
                />
                <div className={classes.title}>{playlist.title}</div>
            </div>
        </NavLink>
    );
};
