import { InputHTMLAttributes } from "react";
import classes from "./Input.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    value: string | number;
    onChange: (value: string) => void;
    type?: React.HTMLInputTypeAttribute;
    className?: string;
}

export const Input = (props: InputProps) => {
    const { onChange, value, className, type = "text", ...otherProps } = props;

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            type={type}
            className={classNames(classes.Input, {}, [className])}
            value={value}
            onChange={handleOnChange}
            {...otherProps}
        />
    );
};
