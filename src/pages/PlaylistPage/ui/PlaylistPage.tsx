import { ISong, SongsList } from "@/entities/song";
import classes from "./PlaylistPage.module.scss";
import songTest from "@/shared/assets/audio/Kid Cudi - Day 'N' Nite.mp3";
import { PageTitle } from "@/shared/ui/PageTitle";

const mockedSongsData: ISong[] = [
    {
        id: "1",
        author: "2pac",
        title: "All eyez on me",
        source: songTest,
        duration: 215,
        img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
    },
    {
        id: "2",
        author: "Fivio Foreign",
        title: "Bop it",
        source: songTest,
        duration: 165,
        img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
    },
    {
        id: "3",
        author: "SR",
        title: "Brucky",
        source: songTest,
        duration: 268,
        img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
    },
    {
        id: "4",
        author: "Gucci Mane",
        title: "Yet",
        source: songTest,
        duration: 225,
        img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
    },
    {
        id: "5",
        author: "2pac",
        title: "All eyez on me",
        source: songTest,
        duration: 307,
        img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
    },
    {
        id: "6",
        author: "Fivio Foreign",
        title: "Bop it",
        source: songTest,
        duration: 203,
        img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
    },
    {
        id: "7",
        author: "SR",
        title: "Brucky",
        source: songTest,
        duration: 225,
        img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
    },
    {
        id: "8",
        author: "Gucci Mane",
        title: "Yet",
        source: songTest,
        duration: 186,
        img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
    },
];

export const PlaylistPage = () => {
    return (
        <div className={classes.PlaylistPage}>
            <div className="container">
                <PageTitle title="Playlist title" />
                <SongsList songs={mockedSongsData} />
            </div>
        </div>
    );
};
