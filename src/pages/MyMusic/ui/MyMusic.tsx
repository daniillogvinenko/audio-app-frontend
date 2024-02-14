import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./MyMusic.module.scss";
import { PageTitle } from "@/shared/ui/PageTitle";
import { useEffect } from "react";
import { useStore } from "@/app/store/store";
import axios from "axios";
import { IPlaylist } from "@/entities/playlist";
import { PlaylistsList } from "@/entities/playlist";
import { MyMusicSkeleton } from "./MyMusicSkeleton/MyMusicSkeleton";

export const MyMusic = () => {
    const playlists = useStore((state) => state.MyMusicPage.playlists);
    const setPlaylists = useStore((state) => state.MyMusicPageActions.setMyMusicPagePlaylists);
    const isLoading = useStore((state) => state.MyMusicPage.isLoading);
    // const isLoading = true;
    const setIsLoading = useStore((state) => state.MyMusicPageActions.setIsLoading);

    useEffect(() => {
        setIsLoading(true);
        axios.get<IPlaylist[]>(`${__API__}/playlists`, { headers: { Authorization: __JWT__ } }).then((response) => {
            setPlaylists(response.data);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className={classNames(classes.MyMusic, {}, [])}>
            <PageTitle title="My Playlists" />
            {isLoading ? <MyMusicSkeleton /> : <PlaylistsList playlists={playlists} />}
        </div>
    );
};
