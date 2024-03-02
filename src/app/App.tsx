import { AppMusic } from "@/features/AppMusic";
import classes from "./App.module.scss";
import { AppRouter } from "./router";
import { ConsoleLogState } from "@/features/ConsoleLogState";
import { useEffect } from "react";
import { LOCALSTORAGE_THEME } from "@/shared/const/const";

function App() {
    useEffect(() => {
        const body = document.body;
        if (localStorage.getItem(LOCALSTORAGE_THEME) === "light") {
            body.className = "app_light_theme";
            document.querySelector("meta[name='theme-color']")?.setAttribute("content", "#F0F0F0");
        } else if (localStorage.getItem(LOCALSTORAGE_THEME) === "dark") {
            body.className = "app_dark_theme";
            document.querySelector("meta[name='theme-color']")?.setAttribute("content", "#0e0e0e");
        }
    }, []);

    return (
        <div className={classes.App}>
            <ConsoleLogState />
            <AppMusic />
            <AppRouter />
        </div>
    );
}

export default App;
