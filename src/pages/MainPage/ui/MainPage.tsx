import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./MainPage.module.scss";
import { AppPlayer } from "@/widgets/AppPlayer";
import { Navigation } from "@/widgets/Navigation";
import { PageTitle } from "@/shared/ui/PageTitle";

export const MainPage = () => {
    return (
        <div className={classNames(classes.MainPage, {}, [])}>
            <div className="container">
                <PageTitle title="SoundWave" margin={45} />
                <AppPlayer className={classes.player} />
            </div>
            <Navigation />
        </div>
    );
};
