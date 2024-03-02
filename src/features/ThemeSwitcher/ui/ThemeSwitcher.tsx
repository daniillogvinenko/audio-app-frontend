import { LOCALSTORAGE_THEME } from "@/shared/const/const";
import classes from "./ThemeSwitcher.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import sunIcon from "@/shared/assets/icons/themeSwitcher/sun.png";
import moonIcon from "@/shared/assets/icons/themeSwitcher/moon.png";
import { useState } from "react";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem(LOCALSTORAGE_THEME));

    const handleOnClick = () => {
        const body = document.body;
        if (localStorage.getItem(LOCALSTORAGE_THEME) === "light") {
            body.className = "app_dark_theme";
            localStorage.setItem(LOCALSTORAGE_THEME, "dark");
            setCurrentTheme("dark");
        } else {
            body.className = "app_light_theme";
            localStorage.setItem(LOCALSTORAGE_THEME, "light");
            setCurrentTheme("light");
        }
    };

    return (
        <div className={classNames(classes.ThemeSwitcher, {}, [className])} onClick={handleOnClick}>
            <button>
                <img src={currentTheme === "light" ? moonIcon : sunIcon} alt="" />
            </button>
        </div>
    );
};
