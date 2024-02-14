import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./PlaylistItem.module.scss";
import { IPlaylist } from "@/entities/playlist";
import { AppImage } from "@/shared/ui/AppImage";
import { NavLink } from "react-router-dom";

interface PlaylistItemProps {
    playlist: IPlaylist;
    className?: string;
}

export const PlaylistItem = (props: PlaylistItemProps) => {
    const { playlist, className } = props;
    return (
        <NavLink to={`/playlist/${playlist.id}`}>
            <div className={classNames(classes.PlaylistItem, {}, [className])}>
                <AppImage className={classes.img} src={`${__API__}/playlistCovers/${playlist.imgSrc}`} />
                <div className={classes.title}>{playlist.title}</div>
            </div>
        </NavLink>
    );
};
