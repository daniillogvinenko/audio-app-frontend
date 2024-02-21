import { ReactNode } from "react";
import { useStore } from "../store/store";
import { Navigate } from "react-router-dom";

interface RequireAuthProps {
    children: ReactNode;
}

// редирект на /login если пользователь не авторизован
export const RequireAuth = ({ children }: RequireAuthProps) => {
    const auth = useStore((state) => state.User.id);

    if (!auth) {
        return <Navigate to={"/login"} />;
    }

    return children;
};
