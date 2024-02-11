import { create } from "zustand";

interface AppState {
    loginPage: {
        usernameInput: string;
        passwordInput: string;
    };
    appPlayer: {
        currentSongId: string;
        isPlaying: boolean;
        nextSongId: string;
        prevSongId: string;
        currentSongTime: number;
        currentSongLength: number;
    };
}

interface Action {
    loginPageActions: {
        setUsernameInput: (value: string) => void;
        setPasswordInput: (value: string) => void;
    };
    appPlayerActions: {
        setCurrentSongId: (value: string) => void;
        setIsPlaying: (value: boolean) => void;
        setNextSongId: (value: string) => void;
        setPrevSongId: (value: string) => void;
        setCurrentSongTime: (value: number) => void;
        setCurrentSongLength: (value: number) => void;
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
    appPlayer: {
        currentSongId: "2",
        isPlaying: false,
        nextSongId: "3",
        prevSongId: "1",
        currentSongLength: 180,
        currentSongTime: 60,
    },
    appPlayerActions: {
        setCurrentSongId: (value) => set((state) => ({ appPlayer: { ...state.appPlayer, currentSongId: value } })),
        setIsPlaying: (value) => set((state) => ({ appPlayer: { ...state.appPlayer, isPlaying: value } })),
        setNextSongId: (value) => set((state) => ({ appPlayer: { ...state.appPlayer, nextSongId: value } })),
        setPrevSongId: (value) => set((state) => ({ appPlayer: { ...state.appPlayer, prevSongId: value } })),
        setCurrentSongTime: (value) => set((state) => ({ appPlayer: { ...state.appPlayer, currentSongTime: value } })),
        setCurrentSongLength: (value) =>
            set((state) => ({ appPlayer: { ...state.appPlayer, currentSongLength: value } })),
    },
}));
