import { Input } from "@/shared/ui/Input";
import classes from "./SignInForm.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useStore } from "@/app/store/store";
import { Button } from "@/shared/ui/Button";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "@/shared/api/api";
import { LOCALSTORAGE_USER } from "@/shared/const/const";

interface SignInFormProps {
    className?: string;
}

export const SignInForm = (props: SignInFormProps) => {
    const { className } = props;

    const passwordValue = useStore((state) => state.loginPage.passwordInput);
    const usernameValue = useStore((state) => state.loginPage.usernameInput);

    const setUsernameValue = useStore((state) => state.loginPageActions.setUsernameInput);
    const setPasswordValue = useStore((state) => state.loginPageActions.setPasswordInput);

    const setUserId = useStore((state) => state.UserActions.setId);
    const setUserPlaylists = useStore((state) => state.UserActions.setPlaylists);
    const setUsername = useStore((state) => state.UserActions.setUsername);

    const navigate = useNavigate();

    const handleSendForm = () => {
        // делаем запрос на /login, чтобы получить токен
        axiosApi
            .post<{ id: string; playlists: string[]; username: string }>("/login", {
                username: usernameValue,
                password: passwordValue,
            })
            .then((response) => {
                const { id, playlists, username } = response.data;
                setUserId(id);
                setUserPlaylists(playlists);
                setUsername(username);
                localStorage.setItem(LOCALSTORAGE_USER, id);
                navigate("/");
            })
            .catch((e: { message: string }) => {
                alert(e.message);
            });
    };

    return (
        <div className={classNames(classes.SignInForm, {}, [className])}>
            <div className={classes.title}>Sign In</div>
            <Input
                full
                placeholder="Enter your username"
                value={usernameValue}
                onChange={setUsernameValue}
                className={classes.usernameInput}
            />
            <Input
                full
                type="password"
                placeholder="Enter your password"
                value={passwordValue}
                onChange={setPasswordValue}
                className={classes.usernameInput}
            />
            <Button onClick={handleSendForm} className={classes.button}>
                Sign In
            </Button>
        </div>
    );
};
