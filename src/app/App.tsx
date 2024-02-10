import classes from "./App.module.scss";
import { AppRouter } from "./router";

function App() {
    return (
        <div className={classes.App}>
            <AppRouter />
        </div>
    );
}

export default App;
