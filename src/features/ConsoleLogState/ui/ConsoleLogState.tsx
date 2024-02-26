import { useStore } from "@/app/store/store";
import classes from "./ConsoleLogState.module.scss";

export const ConsoleLogState = () => {
    const state = useStore((state) => state);

    if (import.meta.env.PROD) {
        return null;
    }

    return (
        <button
            className={classes.ConsoleLogState}
            onClick={() =>
                console.log(state.appMusic.prevQueue, state.appMusic.currentSong.id, state.appMusic.nextQueue, state)
            }
        >
            Log State
        </button>
    );
};
