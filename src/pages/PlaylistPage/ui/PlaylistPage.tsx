import { ISong, SongsList } from "@/entities/song";
import classes from "./PlaylistPage.module.scss";
import songTest from "@/shared/assets/audio/Kid Cudi - Day 'N' Nite.mp3";

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

export const PlaylistPage = () => {
    return (
        <div className={classes.PlaylistPage}>
            <div className={classes.title}>Playlist title</div>
            <SongsList songs={mockedSongsData} />
        </div>
    );
};
