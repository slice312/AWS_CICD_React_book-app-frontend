import Swal, {SweetAlertResult} from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import cn from "classnames";

import {Button} from "@/shared/ui/button";

import css from "./styles.module.scss";


const MySwal = withReactContent(Swal);


const deleteDialog = async (): Promise<SweetAlertResult<void>> => {
    return await MySwal.fire({
        backdrop: true,
        position: "center",
        timer: 3000,
        html: (
            <div className={css.alertContainer}>
                <p className={css.alertSuccessMsg}>Are you sure to delete?</p>
            </div>
        ),
        loaderHtml: <p className={css.alertSuccessMsg}>Are you sure to delete?</p>,
        buttonsStyling: false,
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: "Delete",
        denyButtonText: "Cancel",
        // @ts-ignore
        confirmButtonClass: `${cn(css.dialogButton, css.submitButton)}`,
        denyButtonClass: `${cn(css.dialogButton, css.cancelButton)}`,
    });
};

const showError = async (message: string) => {
    try {
        // Utils.DOM.disableScrolling();

        await MySwal.fire({
            backdrop: true,
            heightAuto: true,
            position: "center",
            icon: "error",
            html: (
                <div className={css.alertContainer}>
                    <p className={css.alertErrorMsg}>{message}</p>
                    <Button onClick={() => MySwal.clickConfirm()}>OK</Button>
                </div>
            ),
            buttonsStyling: false,
            showConfirmButton: false
        });
    } finally {
        // Utils.DOM.enableScrolling();
    }
};


export const Alerts = {
    showError,
    deleteDialog,
};