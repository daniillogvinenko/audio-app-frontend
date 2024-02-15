import { useStore } from "@/app/store/store";
import randomBlack from "@/shared/assets/images/randomBlack.svg";
import randomPurple from "@/shared/assets/images/randomPurple.svg";
import classes from "./ToggleRandom.module.scss";

interface ToggleRandomProps {
    disabled?: boolean;
}

export const ToggleRandom = (props: ToggleRandomProps) => {
    const { disabled } = props;

    const isRandom = useStore((state) => state.appMusic.isRandom);
    const setIsRandom = useStore((state) => state.appMusicActions.setIsRandom);

    return (
        <div className={classes.ToggleRandom}>
            <button disabled={disabled} onClick={() => setIsRandom(!isRandom)}>
                <img src={isRandom ? randomPurple : randomBlack} alt="" />
            </button>
        </div>
    );
};
