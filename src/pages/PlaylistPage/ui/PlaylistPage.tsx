import { ISong, SongsList } from "@/entities/song";
import classes from "./PlaylistPage.module.scss";
import { PageTitle } from "@/shared/ui/PageTitle";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "@/app/store/store";
import { Skeleton } from "@/shared/ui/Skeleton";
import { axiosApi } from "@/shared/api/api";

interface ISongsInPlaylist {
    songs: ISong[];
    playlistTitle: string;
}

export const PlaylistPage = () => {
    const { id } = useParams();

    const isLoading = useStore((state) => state.PlaylistPage.isLoading);
    const setIsLoading = useStore((state) => state.PlaylistPageActions.setIsLoading);
    const songs = useStore((state) => state.PlaylistPage.songs);
    const setSongs = useStore((state) => state.PlaylistPageActions.setSongs);
    const title = useStore((state) => state.PlaylistPage.playlistTitle);
    const setTitle = useStore((state) => state.PlaylistPageActions.setPlaylistTitle);
    const setCurrentSong = useStore((state) => state.appMusicActions.setCurrentSong);
    const setNextQueue = useStore((state) => state.appMusicActions.setNextQueue);
    const setPrevQueue = useStore((state) => state.appMusicActions.setPrevQueue);
    const setCurrentPlaylistTitle = useStore((state) => state.appMusicActions.setCurrentPlaylistTitle);

    useEffect(() => {
        setIsLoading(true);
        axiosApi.get<ISongsInPlaylist>(`/songsInPlaylist/${id}`).then((response) => {
            setSongs(response.data.songs);
            setTitle(response.data.playlistTitle);
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

    const handleOnSongClick = (value: ISong) => {
        setCurrentSong(value);

        // находим индекс песни на которую кликаем в плейлисте
        const indexOfSongInPlaylist = songs.findIndex((song) => song.id === value.id);
        // устанавливаем в качестве предыдущих все песни стоящие до выбранной
        setPrevQueue(songs.slice(0, indexOfSongInPlaylist).map((song) => song.id));
        // устанавливаем в качестве следующих все песни стоящие после выбранной
        setNextQueue(songs.slice(indexOfSongInPlaylist + 1).map((song) => song.id));
        // устанавливаем в качестве текущего плейлиста плейлист в котором была выбрана песня
        setCurrentPlaylistTitle(title);
    };

    return (
        <div className={classes.PlaylistPage}>
            <div className="container">
                <PageTitle title={title} />
                {isLoading ? skeleton : <SongsList onClick={handleOnSongClick} songs={songs} />}
            </div>
        </div>
    );
};
