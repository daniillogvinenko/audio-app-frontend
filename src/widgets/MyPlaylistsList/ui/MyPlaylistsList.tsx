import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./MyPlaylistsList.module.scss";
import { PlaylistItem } from "./PlaylistItem/PlaylistItem";

interface MyPlaylistsListProps {
    className?: string;
}

const mockedPlaylistsData: { id: string; coverImage: string; name: string }[] = [
    {
        id: "1",
        coverImage:
            "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_album-cover-art-73ab5b3d9b81f442cb2288630ab63acf.jpg?ts%20=%201698245952",
        name: "Playlist with my favourite songs :))",
    },
    {
        id: "2",
        coverImage:
            "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/121512436/original/dcd1a36032f6778c05d5e51b98a76b0737657702/create-an-album-or-single-cover-for-your-songs.png",
        name: "gym music",
    },
    {
        id: "3",
        coverImage: "https://pics.craiyon.com/2023-07-20/46b9d691c87f4b8997fcc5160bdc3703.webp",
        name: "CHILL",
    },
    {
        id: "4",
        coverImage:
            "https://d1csarkz8obe9u.cloudfront.net/themedlandingpages/tlp_hero_album-cover-art-73ab5b3d9b81f442cb2288630ab63acf.jpg?ts%20=%201698245952",
        name: "that part",
    },
    {
        id: "5",
        coverImage:
            "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/121512436/original/dcd1a36032f6778c05d5e51b98a76b0737657702/create-an-album-or-single-cover-for-your-songs.png",
        name: "gym music",
    },
    {
        id: "6",
        coverImage: "https://pics.craiyon.com/2023-07-20/46b9d691c87f4b8997fcc5160bdc3703.webp",
        name: "CHILL",
    },
];

export const MyPlaylistsList = (props: MyPlaylistsListProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.MyPlaylistsList, {}, [className])}>
            {mockedPlaylistsData.map((playlist) => (
                <PlaylistItem className={classes.item} playlist={playlist} key={playlist.id} />
            ))}
        </div>
    );
};
