import { Input } from "@/shared/ui/Input";
import classes from "./SignInForm.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useStore } from "@/app/store/store";
import { Button } from "@/shared/ui/Button";

interface SignInFormProps {
    className?: string;
}

export const SignInForm = (props: SignInFormProps) => {
    const { className } = props;

    const passwordValue = useStore((state) => state.loginPage.passwordInput);
    const usernameValue = useStore((state) => state.loginPage.usernameInput);

    const setUsernameValue = useStore((state) => state.loginPageActions.setUsernameInput);
    const setPasswordValue = useStore((state) => state.loginPageActions.setPasswordInput);

    return (
        <div className={classNames(classes.SignInForm, {}, [className])}>
            <div className={classes.title}>Sign In</div>
            <Input
                placeholder="Enter your username"
                value={usernameValue}
                onChange={setUsernameValue}
                className={classes.usernameInput}
            />
            <Input
                type="password"
                placeholder="Enter your password"
                value={passwordValue}
                onChange={setPasswordValue}
                className={classes.usernameInput}
            />
            <Button onClick={() => alert("SIGN IN")} className={classes.button}>
                Sign In
            </Button>
        </div>
    );
};
