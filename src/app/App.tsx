import { AppMusic } from "@/features/AppMusic";
import classes from "./App.module.scss";
import { AppRouter } from "./router";

function App() {
    return (
        <div className={classes.App}>
            <AppMusic />
            <AppRouter />
        </div>
    );
}

export default App;
