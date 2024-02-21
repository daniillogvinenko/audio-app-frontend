import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { LOCALSTORAGE_USER } from "@/shared/const/const";

interface RequireAuthProps {
    children: ReactNode;
}

// редирект на /login если пользователь не авторизован
export const RequireAuth = ({ children }: RequireAuthProps) => {
    const authUserId = localStorage.getItem(LOCALSTORAGE_USER);

    if (!authUserId) {
        return <Navigate to={"/login"} />;
    }

    return children;
};
