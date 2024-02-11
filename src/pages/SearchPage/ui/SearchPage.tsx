import { Input } from "@/shared/ui/Input";
import classes from "./SearchPage.module.scss";
import { useState } from "react";
import { ISong, SongsList } from "@/entities/song";
import songTest from "@/shared/assets/audio/Kid Cudi - Day 'N' Nite.mp3";
import { PageTitle } from "@/shared/ui/PageTitle";

const mockedSongsData: ISong[] = [
    {
        id: "1",
        author: "2pac",
        title: "All eyez on me",
        source: songTest,
        duration: 215,
    },
    {
        id: "2",
        author: "Fivio Foreign",
        title: "Bop it",
        source: songTest,
        duration: 165,
    },
    {
        id: "3",
        author: "SR",
        title: "Brucky",
        source: songTest,
        duration: 268,
    },
    {
        id: "4",
        author: "Gucci Mane",
        title: "Yet",
        source: songTest,
        duration: 225,
    },
    {
        id: "5",
        author: "2pac",
        title: "All eyez on me",
        source: songTest,
        duration: 307,
    },
    {
        id: "6",
        author: "Fivio Foreign",
        title: "Bop it",
        source: songTest,
        duration: 203,
    },
    {
        id: "7",
        author: "SR",
        title: "Brucky",
        source: songTest,
        duration: 225,
    },
    {
        id: "8",
        author: "Gucci Mane",
        title: "Yet",
        source: songTest,
        duration: 186,
    },
];

export const SearchPage = () => {
    const [value, setValue] = useState("");

    return (
        <div className={classes.SearchPage}>
            <div className="container">
                <PageTitle title="Search" />
                <Input value={value} onChange={setValue} placeholder="Search" full className={classes.input} />
                <SongsList songs={mockedSongsData} />
            </div>
        </div>
    );
};
