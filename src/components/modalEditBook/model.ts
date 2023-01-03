import * as Yup from "yup";
import {DTO} from "@/shared/api";


export const validationSchema = Yup.object().shape({
    isbn: Yup.string().required("Required"),
    title: Yup.string().required("Input title"),
    pages: Yup.number().min(0, "Negative")
});


export const getInitialValues = (book?: DTO.Book): DTO.Book => {
    return {
        isbn: book?.isbn || "",
        title: book?.title || "",
        author: book?.author || "",
        description: book?.description || "",
        pages: book?.pages || 0,
    };
};