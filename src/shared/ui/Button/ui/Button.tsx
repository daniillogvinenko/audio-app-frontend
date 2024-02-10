import { classNames } from "@/shared/lib/classNames/classNames";
import { ButtonHTMLAttributes } from "react";
import classes from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    buttonStyle?: "main" | "secondary";
}

export const Button = (props: ButtonProps) => {
    const { children, className, buttonStyle = "main", ...otherProps } = props;

    return (
        <button className={classNames(classes.Button, {}, [className, classes[buttonStyle]])} {...otherProps}>
            {children}
        </button>
    );
};
