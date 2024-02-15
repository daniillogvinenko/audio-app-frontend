import { AppMusic } from "@/features/AppMusic";
import classes from "./App.module.scss";
import { AppRouter } from "./router";
import { ConsoleLogState } from "@/features/ConsoleLogState";

function App() {
    return (
        <div className={classes.App}>
            <ConsoleLogState />
            <AppMusic />
            <AppRouter />
        </div>
    );
}

export default App;
