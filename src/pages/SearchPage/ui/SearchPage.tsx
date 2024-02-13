import { Input } from "@/shared/ui/Input";
import classes from "./SearchPage.module.scss";
import { useEffect, useState } from "react";
import { ISong, SongsList } from "@/entities/song";
import { PageTitle } from "@/shared/ui/PageTitle";
import { useStore } from "@/app/store/store";
import axios from "axios";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";

export const SearchPage = () => {
    const [value, setValue] = useState("");

    const songs = useStore((state) => state.searchPage.songs);
    const setSearchPageSongs = useStore((state) => state.searchPageActions.setSearchPageSongs);
    const isLoading = useStore((state) => state.searchPage.isLoading);
    const setIsLoading = useStore((state) => state.searchPageActions.setSearchPageIsLoading);

    const debouncedAxios = useDebounce(() => {
        setIsLoading(true);
        axios.get<ISong[]>(`${__API__}/songs?q=${value}`, { headers: { Authorization: __JWT__ } }).then((response) => {
            setSearchPageSongs(response.data);
            setIsLoading(false);
        });
    }, 1000);

    // загрузка песен с сервера
    useEffect(() => {
        debouncedAxios();

        return () => setSearchPageSongs([]);
    }, [value]);

    return (
        <div className={classes.SearchPage}>
            <div className="container">
                <PageTitle title="Search" />
                <Input value={value} onChange={setValue} placeholder="Search" full className={classes.input} />
                {isLoading ? <div>Loading...</div> : <SongsList songs={songs} />}
            </div>
        </div>
    );
};
