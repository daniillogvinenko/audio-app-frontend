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
        } else if (localStorage.getItem(LOCALSTORAGE_THEME) === "dark") {
            body.className = "app_dark_theme";
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
