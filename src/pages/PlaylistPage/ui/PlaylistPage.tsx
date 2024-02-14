import { ISong, SongsList } from "@/entities/song";
import classes from "./PlaylistPage.module.scss";
import { PageTitle } from "@/shared/ui/PageTitle";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "@/app/store/store";
import axios from "axios";
import { Skeleton } from "@/shared/ui/Skeleton";

export const PlaylistPage = () => {
    const { id } = useParams();

    const isLoading = useStore((state) => state.PlaylistPage.isLoading);
    const setIsLoading = useStore((state) => state.PlaylistPageActions.setIsLoading);
    const songs = useStore((state) => state.PlaylistPage.songs);
    const setSongs = useStore((state) => state.PlaylistPageActions.setSongs);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get<ISong[]>(`${__API__}/songsInPlaylist/${id}`, { headers: { Authorization: __JWT__ } })
            .then((response) => {
                setSongs(response.data);
                setIsLoading(false);
            });
    }, []);

    const skeleton = (
        <>
            <Skeleton height={72} border="8px" className={classes.skeleton} />
            <Skeleton height={72} border="8px" className={classes.skeleton} />
            <Skeleton height={72} border="8px" className={classes.skeleton} />
            <Skeleton height={72} border="8px" className={classes.skeleton} />
        </>
    );

    return (
        <div className={classes.PlaylistPage}>
            <div className="container">
                <PageTitle title="Playlist title" />
                {isLoading ? skeleton : <SongsList songs={songs} />}
            </div>
        </div>
    );
};
