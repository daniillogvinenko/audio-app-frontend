import { Route, Routes } from "react-router-dom";
import { routerConfig } from "./routerConfig";
import { RequireAuth } from "./RequireAuth";

export const AppRouter = () => {
    return (
        <Routes>
            {Object.values(routerConfig).map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    // если данный маршрут authOnly, то произойдет проверка авторизован ли пользователь, если нет - редирект на /login
                    element={route.authOnly ? <RequireAuth>{route.element}</RequireAuth> : route.element}
                />
            ))}
        </Routes>
    );
};
