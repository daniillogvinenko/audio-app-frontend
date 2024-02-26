import { PlaylistPage } from "@/pages/PlaylistPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SearchPage } from "@/pages/SearchPage";
import { LoginPage } from "@/pages/LoginPage";
import { MainPage } from "@/pages/MainPage";
import { MyMusic } from "@/pages/MyMusic";

export const routerConfig = {
    login: {
        path: "/login",
        element: <LoginPage />,
        authOnly: false,
    },
    main: {
        path: "/",
        element: <MainPage />,
        authOnly: true,
    },
    myMusic: {
        path: "/mymusic",
        element: <MyMusic />,
        authOnly: true,
    },
    playlistPage: {
        path: "/playlist/:id",
        element: <PlaylistPage />,
        authOnly: true,
    },
    searchPage: {
        path: "/search",
        element: <SearchPage />,
        authOnly: true,
    },
    profilePage: {
        path: "/profile",
        element: <ProfilePage />,
        authOnly: true,
    },
};
