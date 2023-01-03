import {Fragment} from "react";

import "./styles/index.scss";
import {Router} from "./Router";
import {Footer} from "./footer";

import css from "./styles.module.scss";


export const App = () => {
    return (
        <Fragment>
            <main className={css.content}>
                <Router/>
            </main>
            <Footer/>
        </Fragment>
    );
};