import { LOCALSTORAGE_THEME } from "@/shared/const/const";
import classes from "./ThemeSwitcher.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const handleOnClick = () => {
        const body = document.body;
        if (localStorage.getItem(LOCALSTORAGE_THEME) === "light") {
            body.className = "app_dark_theme";
            localStorage.setItem(LOCALSTORAGE_THEME, "dark");
        } else {
            body.className = "app_light_theme";
            localStorage.setItem(LOCALSTORAGE_THEME, "light");
        }
    };

    return (
        <div className={classNames(classes.ThemeSwitcher, {}, [className])} onClick={handleOnClick}>
            ThemeSwitcher
        </div>
    );
};
