import { useStore } from "@/app/store/store";
import randomBlack from "@/shared/assets/images/randomBlack.svg";
import classes from "./ToggleRandom.module.scss";
import { shuffleArray } from "@/shared/lib/shuffleArray/shuffleArray";

interface ToggleRandomProps {
    disabled?: boolean;
}

export const ToggleRandom = (props: ToggleRandomProps) => {
    const { disabled } = props;

    const nextQueue = useStore((state) => state.appMusic.nextQueue);
    const prevQueue = useStore((state) => state.appMusic.prevQueue);
    const setNextQueue = useStore((state) => state.appMusicActions.setNextQueue);
    const setPrevQueue = useStore((state) => state.appMusicActions.setPrevQueue);

    const handleOnClick = () => {
        setNextQueue(shuffleArray([...nextQueue, ...prevQueue]));
        setPrevQueue([]);
    };

    return (
        <div className={classes.ToggleRandom}>
            <button disabled={disabled} onClick={handleOnClick}>
                <img src={randomBlack} alt="" />
            </button>
        </div>
    );
};
