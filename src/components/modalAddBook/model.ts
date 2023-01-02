import * as Yup from "yup";
import {DTO} from "@/shared/api";


export const validationSchema = Yup.object().shape({
    isbn: Yup.string().min(3, "At least 3 characters")
        .required("Required"),
    title: Yup.string().required("Required"),
    pages: Yup.number().min(0, "Negative")
});


export const initialValues: Readonly<DTO.Book> = {
    isbn: "",
    title: "",
    author: "",
    description: "",
    pages: 0,
};
