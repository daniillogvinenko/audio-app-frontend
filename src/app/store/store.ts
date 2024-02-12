import { ISong } from "@/entities/song";
import { create } from "zustand";
import testSong from "@/shared/assets/audio/Kid Cudi - Day 'N' Nite.mp3";

interface AppState {
    loginPage: {
        usernameInput: string;
        passwordInput: string;
    };
    appMusic: {
        currentSong: ISong;
        isPlaying: boolean;
        nextSongId: string;
        prevSongId: string;
        currentSongTime: number;
        externalNewSongTime: number | null;
    };
}

interface Action {
    loginPageActions: {
        setUsernameInput: (value: string) => void;
        setPasswordInput: (value: string) => void;
    };
    appMusicActions: {
        setCurrentSong: (value: ISong) => void;
        setIsPlaying: (value: boolean) => void;
        setNextSongId: (value: string) => void;
        setPrevSongId: (value: string) => void;
        setCurrentSongTime: (value: number) => void;
        setExternalNewSongTime: (value: number | null) => void;
    };
}

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
            source: testSong,
            duration: 222,
            id: "1",
            img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
        },
        isPlaying: false,
        nextSongId: "3",
        prevSongId: "1",
        currentSongTime: 60,
        externalNewSongTime: null,
    },
    appMusicActions: {
        setCurrentSong: (value) => set((state) => ({ appMusic: { ...state.appMusic, currentSong: value } })),
        setIsPlaying: (value) => set((state) => ({ appMusic: { ...state.appMusic, isPlaying: value } })),
        setNextSongId: (value) => set((state) => ({ appMusic: { ...state.appMusic, nextSongId: value } })),
        setPrevSongId: (value) => set((state) => ({ appMusic: { ...state.appMusic, prevSongId: value } })),
        setCurrentSongTime: (value) => set((state) => ({ appMusic: { ...state.appMusic, currentSongTime: value } })),
        setExternalNewSongTime: (value) =>
            set((state) => ({ appMusic: { ...state.appMusic, externalNewSongTime: value } })),
    },
}));
