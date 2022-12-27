import {useFormik} from "formik";
import * as Yup from "yup";

import {Modal} from "@/shared/ui/modal/Modal";
import {Button} from "@/shared/ui/button";

import css from "./styles.module.scss";

import {ReactComponent as XMarkIcon} from "@/assets/icons/x-mark.svg";


export const validationSchema = Yup.object().shape({
    isbn: Yup.string().required("Input title"),
    title: Yup.string().required("Input title"),
    author: Yup.string().required("Input title"),
    year: Yup.date()
        .max(new Date().getFullYear(), "nono"),
    pages: Yup.number().required("Input title"),
    description: Yup.string().required("Input title"),
});


interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalAddBook = ({isOpen, onClose}: Props) => {
    const formik = useFormik({
        initialValues: {
            isbn: "",
            title: "",
            author: "",
            year: "",
            pages: 0,
            description: ""
        },
        validationSchema,
        validateOnBlur: false,
        validateOnChange: true,
        onSubmit: async (values) => {
            console.log("FORMIK", values);

        }
    });
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={css.content}>
                <Button
                    className={css.btnClose}
                    type="button"
                    onClick={close}
                    Icon={<XMarkIcon/>}
                >
                </Button>
                <h2 className={css.title}>Add Book</h2>

                <form
                    className={css.form}
                    autoComplete="on"
                    onSubmit={formik.handleSubmit}
                >
                    <div className={css.field}>
                        <label htmlFor="input-isbn">
                            ISBN:
                        </label>
                        <input
                            id="input-isbn"
                            className={formik.errors.isbn && css.inputError}
                            type="text"
                            placeholder="ISBN"
                            {...formik.getFieldProps("isbn")}
                        />
                        <span className={css.errorLabel}>{formik.errors.isbn}</span>
                    </div>

                    <div className={css.field}>
                        <label htmlFor="input-title">
                            Title:
                        </label>
                        <input
                            id="input-title"
                            className={formik.errors.title && css.inputError}
                            type="text"
                            placeholder="Title"
                            {...formik.getFieldProps("title")}
                        />
                        <span className={css.errorLabel}>{formik.errors.title}</span>
                    </div>

                    <div className={css.field}>
                        <label htmlFor="input-author">
                            Author:
                        </label>
                        <input
                            id="input-author"
                            className={formik.errors.author && css.inputError}
                            type="text"
                            placeholder="Author"
                            {...formik.getFieldProps("author")}
                        />
                        <span className={css.errorLabel}>{formik.errors.author}</span>
                    </div>

                    <div className={css.field}>
                        <label htmlFor="input-year">
                            Year:
                        </label>
                        <input
                            id="input-year"
                            className={formik.errors.year && css.inputError}
                            type="number"
                            pattern="d{4}"
                            placeholder="Publish year"
                            {...formik.getFieldProps("year")}
                        />
                        <span className={css.errorLabel}>{formik.errors.year}</span>
                    </div>

                    <div className={css.field}>
                        <label htmlFor="input-pages">
                            Pages:
                        </label>
                        <input
                            id="input-pages"
                            className={formik.errors.pages && css.inputError}
                            type="number"
                            placeholder="Pages"
                            {...formik.getFieldProps("pages")}
                        />
                        <span className={css.errorLabel}>{formik.errors.pages}</span>
                    </div>

                    <div className={css.field}>
                        <label htmlFor="input-description">
                            Description:
                        </label>
                        <input
                            id="input-description"
                            className={formik.errors.description && css.inputError}
                            type="text"
                            placeholder="Description"
                            {...formik.getFieldProps("description")}
                        />
                        <span className={css.errorLabel}>{formik.errors.description}</span>
                    </div>
                    <Button className={css.btnSave} type="submit">
                        Save
                    </Button>
                </form>
            </div>
        </Modal>
    );
};