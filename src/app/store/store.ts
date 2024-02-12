import { ISong } from "@/entities/song";
import { create } from "zustand";

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
            title: "placeholder",
            author: "placeholder",
            source: "placeholder",
            duration: 100,
            id: "placeholder",
            img: "placeholder",
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
