import {useState, useEffect} from "react";
import {useFormik} from "formik";
import Swal from "sweetalert2";
import cn from "classnames";

import {DTO, bookApi} from "@/shared/api";
import {withModal} from "@/shared/ui/modal";
import {Button} from "@/shared/ui/button";
import {BlockingLoader} from "@/shared/ui/blockingLoader";

import {validationSchema, initialValues} from "./model";
import css from "./modalAddBook.module.scss";

import {ReactComponent as XMarkIcon} from "@/assets/icons/x-mark.svg";


interface Props {
    isOpen: boolean;
    onClose: () => void;
}


export const ModalAddBook = withModal(({isOpen, onClose}: Props) => {
    const [addBookTrigger] = bookApi.useAddBookMutation();
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnBlur: false,
        validateOnChange: isValidateOnChange,
        validate: () => {
            setIsValidateOnChange(true);
        },
        onSubmit: async (values, {setSubmitting, setFieldError, resetForm}) => {
            try {
                BlockingLoader.show();
                const newBookData = await addBookTrigger(values).unwrap();
                if (newBookData) {
                    await Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    onClose();
                    resetForm();
                }
            } catch (err) {
                const error = err as DTO.FormModelError;
                Object.keys(error.data)
                    .forEach(key => setFieldError(key, error.data[key][0]));
            } finally {
                setSubmitting(false);
                BlockingLoader.hide();
            }
        }
    });

    useEffect(() => {
        return () => {
            formik.resetForm({values: initialValues});
        };
    }, []);


    return (
        <div className={css.content}>
            <Button
                className={css.btnClose}
                type="button"
                onClick={onClose}
                Icon={<XMarkIcon/>}
            >
            </Button>
            <h2 className={css.title}>Add Book</h2>
            <form className={css.form} autoComplete="on" onSubmit={formik.handleSubmit}>
                <div className={css.field}>
                    <label htmlFor="input-isbn">
                        ISBN:
                    </label>
                    <input
                        id="input-isbn"
                        className={cn(css.input, formik.errors.isbn && css.inputError)}
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