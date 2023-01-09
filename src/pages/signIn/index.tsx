import {useFormik} from "formik";
import css from "./styles.module.scss";
import {Button} from "@/shared/ui/button";

import {signInWithEmail} from "@/shared/lib/cognito";


export const SignInPage = () => {

    const formik = useFormik({
        initialValues: {
            name: "",
            code: ""
        },
        onSubmit: async (values, {resetForm}) => {
            const response = await signInWithEmail(values.name, values.code);
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
                    Sign In
                </Button>
            </form>
        </div>
    );
};