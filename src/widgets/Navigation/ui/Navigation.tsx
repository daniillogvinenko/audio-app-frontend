import { classNames } from "@/shared/lib/classNames/classNames";
import classes from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";
import img1 from "@/shared/assets/icons/navigationLibraryItem.png";
import img2 from "@/shared/assets/icons/navigationSearchItem.png";
import img3 from "@/shared/assets/icons/navigationProfile.png";

interface NavigationProps {
    className?: string;
}

export const Navigation = (props: NavigationProps) => {
    const { className } = props;

    return (
        <div className={classNames(classes.Navigation, {}, [className])}>
            <div className={classes.ItemsContainer}>
                <NavLink to={"/mymusic"}>
                    <img src={img1} alt="" />
                </NavLink>
                <NavLink to={"/search"}>
                    <img src={img2} alt="" />
                </NavLink>
                <NavLink to={"/profile"}>
                    <img src={img3} alt="" />
                </NavLink>
            </div>
        </div>
    );
};
