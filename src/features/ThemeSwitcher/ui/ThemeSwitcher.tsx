export const ThemeSwitcher = () => {
    const handleOnClick = () => {
        const body = document.body;
        body.className = "app_dark_theme";
    };

    return <div onClick={handleOnClick}>ThemeSwitcher</div>;
};
