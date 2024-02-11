import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./MainPage.module.scss";
import { AppPlayer } from "@/widgets/AppPlayer";

export const MainPage = () => {
    return (
        <div className={classNames(classes.MainPage, {}, [])}>
            <div className={classes.title}>APP NAME</div>
            <AppPlayer className={classes.player} />
        </div>
    );
};
