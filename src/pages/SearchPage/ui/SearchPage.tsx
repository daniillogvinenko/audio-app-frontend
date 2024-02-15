import { Input } from "@/shared/ui/Input";
import classes from "./SearchPage.module.scss";
import { useEffect, useState } from "react";
import { ISong, SongsList } from "@/entities/song";
import { PageTitle } from "@/shared/ui/PageTitle";
import { useStore } from "@/app/store/store";
import axios from "axios";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { Skeleton } from "@/shared/ui/Skeleton";

export const SearchPage = () => {
    const [inputValue, setInputValue] = useState("");

    const songs = useStore((state) => state.searchPage.songs);
    const setSearchPageSongs = useStore((state) => state.searchPageActions.setSearchPageSongs);
    const isLoading = useStore((state) => state.searchPage.isLoading);
    const setIsLoading = useStore((state) => state.searchPageActions.setSearchPageIsLoading);

    const debouncedAxios = useDebounce(() => {
        setIsLoading(true);
        axios
            .get<ISong[]>(`${__API__}/songs?q=${inputValue}`, { headers: { Authorization: __JWT__ } })
            .then((response) => {
                setSearchPageSongs(response.data);
                setIsLoading(false);
            });
    }, 1000);

    // загрузка песен с сервера
    useEffect(() => {
        debouncedAxios();

        return () => setSearchPageSongs([]);
    }, [inputValue]);

    const skeleton = (
        <>
            <Skeleton height={72} border="8px" className={classes.skeleton} />
            <Skeleton height={72} border="8px" className={classes.skeleton} />
            <Skeleton height={72} border="8px" className={classes.skeleton} />
            <Skeleton height={72} border="8px" className={classes.skeleton} />
        </>
    );

    const handleOnSongClick = (value: ISong) => {
        console.log(value);
    };

    return (
        <div className={classes.SearchPage}>
            <div className="container">
                <PageTitle title="Search" />
                <Input
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder="Search"
                    full
                    className={classes.input}
                />
                {/* если строка поиска пустая, то ничего не будет отображено */}
                {isLoading ? skeleton : <SongsList onClick={handleOnSongClick} songs={inputValue ? songs : []} />}
            </div>
        </div>
    );
};
