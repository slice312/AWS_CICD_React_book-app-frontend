import "./styles/index.scss";
import {Router} from "./Router";
import {Footer} from "./footer";
import {Fragment} from "react";

// TODO: folder structure recheck

export const App = () => {
    return (
        <Fragment>
            <Router/>
            <Footer/>
        </Fragment>
    );
};