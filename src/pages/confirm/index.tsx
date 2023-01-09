import {useFormik} from "formik";
import css from "./styles.module.scss";
import {Button} from "@/shared/ui/button";

import {verifyCode} from "@/shared/lib/cognito";


export const ConfirmPage = () => {

    const formik = useFormik({
        initialValues: {
            name: "",
            code: ""
        },
        onSubmit: async (values, {resetForm}) => {
            const response = await verifyCode(values.name, values.code);
            console.log(response);
        }
    });


    return (
        <div>
            <form className={css.form} onSubmit={formik.handleSubmit}>
                <label htmlFor="">
                    name
                    <input
                        type="text"
                        {...formik.getFieldProps("name")}
                    />
                </label>
                <label htmlFor="">
                    password
                    <input
                        type="text"
                        {...formik.getFieldProps("code")}
                    />
                </label>

                <Button type="submit">
                    Confirm
                </Button>
            </form>
        </div>
    );
};