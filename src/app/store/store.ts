import { create } from "zustand";

interface AppState {
    loginPage: {
        usernameInput: string;
        passwordInput: string;
    };
}

interface Action {
    loginPageActions: {
        setUsernameInput: (value: string) => void;
        setPasswordInput: (value: string) => void;
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
}));
