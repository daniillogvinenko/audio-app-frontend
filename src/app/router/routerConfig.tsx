import { LoginPage } from "@/pages/LoginPage";
import { MainPage } from "@/pages/MainPage";
import { MyMusic } from "@/pages/MyMusic/ui/MyMusic";
import { PlaylistPage } from "@/pages/PlaylistPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SearchPage } from "@/pages/SearchPage";

export const routerConfig = {
    login: {
        path: "/login",
        element: <LoginPage />,
    },
    main: {
        path: "/",
        element: <MainPage />,
    },
    myMusic: {
        path: "/mymusic",
        element: <MyMusic />,
    },
    playlistPage: {
        path: "/playlist/:id",
        element: <PlaylistPage />,
    },
    searchPage: {
        path: "/search",
        element: <SearchPage />,
    },
    profilePage: {
        path: "/profile",
        element: <ProfilePage />,
    },
};
