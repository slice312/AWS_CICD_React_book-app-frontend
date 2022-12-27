import {AxiosResponse} from "axios";

import {axiosInstance} from "./axiosInstance";
import * as DTO from "./types";


const getAllBooks = (): Promise<AxiosResponse<DTO.Book[]>> => {
    return axiosInstance.get("Book/get");
};

const deleteBook = (isbn: string): Promise<AxiosResponse<void>> => {
    return axiosInstance.delete(`Book/delete/${isbn}`);
};

export const Api = {
    getAllBooks,
    deleteBook
};