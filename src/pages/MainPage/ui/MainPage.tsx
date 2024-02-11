import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./MainPage.module.scss";
import { AppPlayer } from "@/widgets/AppPlayer";
import { Navigation } from "@/widgets/Navigation";

export const MainPage = () => {
    return (
        <div className={classNames(classes.MainPage, {}, [])}>
            <div className={classes.title}>APP NAME</div>
            <AppPlayer className={classes.player} />
            <Navigation />
        </div>
    );
};
