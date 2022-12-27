import {AxiosResponse} from "axios";

import {axiosInstance} from "./axiosInstance";
import * as DTO from "./types";


const getAllBooks = (): Promise<AxiosResponse<DTO.Book[]>> => {
    return axiosInstance.get("Book/list");
};

const deleteBook = (isbn: string): Promise<AxiosResponse<void>> => {
    return axiosInstance.delete(`Book/${isbn}`);
};

const addBook = (book: DTO.Book): Promise<AxiosResponse<void>> => {
    return axiosInstance.post("Book", book);
};

export const Api = {
    getAllBooks,
    deleteBook,
    addBook
};