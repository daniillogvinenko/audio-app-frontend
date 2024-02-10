import img from "@/shared/assets/images/loginPage.png";
import classes from "./LoginPage.module.scss";
import { SignInForm } from "@/features/SignInForm";

export const LoginPage = () => {
    return (
        <div className="container">
            <div className={classes.img}>
                <img src={img} alt="" />
            </div>
            <SignInForm />
        </div>
    );
};
