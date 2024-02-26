import { IPlaylist } from "@/entities/playlist";
import { ISong } from "@/entities/song";

export interface AppState {
    loginPage: {
        usernameInput: string;
        passwordInput: string;
    };
    appMusic: {
        currentSong: ISong;
        isPlaying: boolean;
        currentSongTime: number;
        externalNewSongTime: number | null;
        isLoading: boolean;
        nextQueue: string[];
        prevQueue: string[];
        currentPlaylistTitle: string;
    };
    searchPage: {
        songs: ISong[];
        isLoading: boolean;
    };
    MyMusicPage: {
        playlists: IPlaylist[];
        isLoading: boolean;
    };
    PlaylistPage: {
        songs: ISong[];
        isLoading: boolean;
        playlistTitle: string;
    };
    User: {
        id: string;
        username: string;
        playlists: string[];
    };
}

export interface Action {
    loginPageActions: {
        setUsernameInput: (value: string) => void;
        setPasswordInput: (value: string) => void;
    };
    appMusicActions: {
        setCurrentSong: (value: ISong) => void;
        setIsPlaying: (value: boolean) => void;
        setCurrentSongTime: (value: number) => void;
        setExternalNewSongTime: (value: number | null) => void;
        setIsLoading: (value: boolean) => void;
        setNextQueue: (value: string[]) => void;
        setPrevQueue: (value: string[]) => void;
        setCurrentPlaylistTitle: (value: string) => void;
    };
    searchPageActions: {
        setSearchPageSongs: (value: ISong[]) => void;
        setSearchPageIsLoading: (value: boolean) => void;
    };
    MyMusicPageActions: {
        setMyMusicPagePlaylists: (value: IPlaylist[]) => void;
        setIsLoading: (value: boolean) => void;
    };
    PlaylistPageActions: {
        setSongs: (value: ISong[]) => void;
        setIsLoading: (value: boolean) => void;
        setPlaylistTitle: (value: string) => void;
    };
    UserActions: {
        setId: (value: string) => void;
        setUsername: (value: string) => void;
        setPlaylists: (value: string[]) => void;
    };
}
