import { LoginPage } from "@/pages/LoginPage";
import { MainPage } from "@/pages/MainPage";

export const routerConfig = {
    login: {
        path: "/login",
        element: <LoginPage />,
    },
    main: {
        path: "/",
        element: <MainPage />,
    },
};
