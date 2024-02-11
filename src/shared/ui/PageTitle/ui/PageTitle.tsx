import classes from "./PageTitle.module.scss";

interface PageTitleProps {
    title: string;
    margin?: number;
}

export const PageTitle = ({ title, margin = 72 }: PageTitleProps) => {
    return (
        <div style={{ marginBottom: `${margin}px` }} className={classes.title}>
            {title}
        </div>
    );
};
