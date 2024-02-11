import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./MainPage.module.scss";
import { AppPlayer } from "@/widgets/AppPlayer";
import { Navigation } from "@/widgets/Navigation";
import { PageTitle } from "@/shared/ui/PageTitle";

export const MainPage = () => {
    return (
        <div className={classNames(classes.MainPage, {}, [])}>
            <PageTitle title="APP NAME" margin={45} />
            <AppPlayer className={classes.player} />
            <Navigation />
        </div>
    );
};
