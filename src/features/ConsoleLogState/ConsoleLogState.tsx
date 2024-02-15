import { useStore } from "@/app/store/store";
import classes from "./ConsoleLogState.module.scss";

export const ConsoleLogState = () => {
    const state = useStore((state) => state);

    return (
        <button
            className={classes.ConsoleLogState}
            onClick={() =>
                console.log(state.appMusic.prevQueue, state.appMusic.currentSong.id, state.appMusic.nextQueue)
            }
        >
            Log State
        </button>
    );
};
