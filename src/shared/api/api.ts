import axios from "axios";
import { LOCALSTORAGE_JWT } from "../const/const";

export const authAxios = axios.create({
    baseURL: __API__,
    headers: {
        Authorization: `Bearer ${localStorage.getItem(LOCALSTORAGE_JWT)}`,
    },
});
