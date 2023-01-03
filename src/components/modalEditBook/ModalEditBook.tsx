import {useEffect, useState} from "react";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import cn from "classnames";

import {DTO, Api, bookApi} from "@/shared/api";
import {withModal} from "@/shared/ui/modal";
import {Button} from "@/shared/ui/button";
import {Alerts} from "@/shared/ui/alerts";
import {BlockingLoader} from "@/shared/ui/blockingLoader";

import {validationSchema, getInitialValues} from "./model";
import css from "./styles.module.scss";

import {ReactComponent as XMarkIcon} from "@/assets/icons/x-mark.svg";




interface Props {
    isbn: string;
    isOpen: boolean;
    onClose: () => void;
}


export const ModalEditBook = withModal(({isbn, isOpen, onClose}: Props) => {
    const [updateBookTrigger] = bookApi.useUpdateBookMutation();

    const [book, setBook] = useState<DTO.Book>();

    useEffect(() => {
        if (!isbn)
            return;
        (async () => {
            try {
                const {data} = await Api.getBookByIsbn(isbn);
                if (data) {
                    setBook(data);
                }
            } catch (err) {

            }
        })();
    }, [isbn]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: getInitialValues(book),
        validationSchema,
        validateOnBlur: false,
        validateOnChange: true,
        onSubmit: async (values, {setSubmitting, resetForm}) => {
            try {
                BlockingLoader.show();
                await updateBookTrigger({isbn, book: {...values}}).unwrap();
                // TODO: response
                // const response = await Api.addBook(values);
                // if (response.status === 200) {
                await Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Updated",
                    showConfirmButton: false,
                    timer: 1500
                });
                onClose();
                resetForm();
            } catch (err) {
                console.error(err);
                const {error} = err as { error: string };
                await Alerts.showError(error || "Unknown");
            } finally {
                setSubmitting(false);
                BlockingLoader.hide();
            }
        }
    });


    return (
        <div className={css.content}>
            <Button
                className={css.btnClose}
                type="button"
                onClick={onClose}
                Icon={<XMarkIcon/>}
            >
            </Button>
            <h2 className={css.title}>Edit Book</h2>

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
                        className={cn(css.input, formik.errors.isbn && css.inputError)}
                        type="text"
                        placeholder="ISBN"
                        readOnly
                        disabled
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
                        className={cn(css.input, formik.errors.title && css.inputError)}
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
                        className={cn(css.input, formik.errors.author && css.inputError)}
                        type="text"
                        placeholder="Author"
                        {...formik.getFieldProps("author")}
                    />
                    <span className={css.errorLabel}>{formik.errors.author}</span>
                </div>

                <div className={css.field}>
                    <label htmlFor="input-pages">
                        Pages:
                    </label>
                    <input
                        id="input-pages"
                        className={cn(css.input, formik.errors.pages && css.inputError)}
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
                    <textarea
                        id="input-description"
                        className={cn(css.input, formik.errors.description && css.inputError)}
                        placeholder="Description"
                        {...formik.getFieldProps("description")}
                    />
                    <span className={css.errorLabel}>{formik.errors.description}</span>
                </div>

                <Button className={css.btnSave} type="submit" disabled={formik.isSubmitting}>
                    Save
                </Button>
            </form>
        </div>
    );
});