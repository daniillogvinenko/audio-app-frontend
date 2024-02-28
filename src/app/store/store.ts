import { create } from "zustand";
import { Action, AppState } from "./storeTypes";

export const useStore = create<AppState & Action>()((set) => ({
    loginPage: {
        usernameInput: "",
        passwordInput: "",
    },
    loginPageActions: {
        setUsernameInput: (value) => set((state) => ({ loginPage: { ...state.loginPage, usernameInput: value } })),
        setPasswordInput: (value) => set((state) => ({ loginPage: { ...state.loginPage, passwordInput: value } })),
    },
    // --------
    appMusic: {
        currentSong: {
            title: "Day 'N' Nite",
            author: "Kid Cudi",
            source: "2.mp3",
            duration: "3:42",
            id: "2",
            img: "2.jpg",
        },
        isPlaying: false,
        currentSongTime: 0,
        externalNewSongTime: null,
        isLoading: false,
        nextQueue: [],
        prevQueue: [],
        currentPlaylistTitle: "",
    },
    appMusicActions: {
        setCurrentSong: (value) => set((state) => ({ appMusic: { ...state.appMusic, currentSong: value } })),
        setIsPlaying: (value) => set((state) => ({ appMusic: { ...state.appMusic, isPlaying: value } })),
        setCurrentSongTime: (value) => set((state) => ({ appMusic: { ...state.appMusic, currentSongTime: value } })),
        setExternalNewSongTime: (value) =>
            set((state) => ({ appMusic: { ...state.appMusic, externalNewSongTime: value } })),
        setIsLoading: (value) => set((state) => ({ appMusic: { ...state.appMusic, isLoading: value } })),
        setNextQueue: (value: string[]) => set((state) => ({ appMusic: { ...state.appMusic, nextQueue: value } })),
        setPrevQueue: (value: string[]) => set((state) => ({ appMusic: { ...state.appMusic, prevQueue: value } })),
        setCurrentPlaylistTitle: (value: string) =>
            set((state) => ({ appMusic: { ...state.appMusic, currentPlaylistTitle: value } })),
    },
    // --------
    searchPage: {
        isLoading: false,
        songs: [],
    },
    searchPageActions: {
        setSearchPageSongs: (value) => set((state) => ({ searchPage: { ...state.searchPage, songs: value } })),
        setSearchPageIsLoading: (value) => set((state) => ({ searchPage: { ...state.searchPage, isLoading: value } })),
    },
    // ------------
    MyMusicPage: {
        isLoading: false,
        playlists: [],
    },
    MyMusicPageActions: {
        setIsLoading: (value) => set((state) => ({ MyMusicPage: { ...state.MyMusicPage, isLoading: value } })),
        setMyMusicPagePlaylists: (value) =>
            set((state) => ({ MyMusicPage: { ...state.MyMusicPage, playlists: value } })),
    },
    // -------------
    PlaylistPage: {
        isLoading: false,
        songs: [],
        playlistTitle: "",
    },
    PlaylistPageActions: {
        setIsLoading: (value) => set((state) => ({ PlaylistPage: { ...state.PlaylistPage, isLoading: value } })),
        setSongs: (value) => set((state) => ({ PlaylistPage: { ...state.PlaylistPage, songs: value } })),
        setPlaylistTitle: (value: string) =>
            set((state) => ({ PlaylistPage: { ...state.PlaylistPage, playlistTitle: value } })),
    },
    // -------------
    User: {
        id: "",
        username: "",
        playlists: [],
    },
    UserActions: {
        setId: (value: string) => set((state) => ({ User: { ...state.User, id: value } })),
        setUsername: (value: string) => set((state) => ({ User: { ...state.User, username: value } })),
        setPlaylists: (value: string[]) => set((state) => ({ User: { ...state.User, playlists: value } })),
    },
}));
