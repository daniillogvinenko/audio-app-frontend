import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./PlaylistItem.module.scss";

interface PlaylistItemProps {
    playlist: { id: string; coverImage: string; name: string };
    className?: string;
}

export const PlaylistItem = (props: PlaylistItemProps) => {
    const { playlist, className } = props;
    return (
        <div className={classNames(classes.PlaylistItem, {}, [className])}>
            <div className={classes.img} style={{ background: `url('${playlist.coverImage}') center/cover` }} />
            <div className={classes.title}>{playlist.name}</div>
        </div>
    );
};
