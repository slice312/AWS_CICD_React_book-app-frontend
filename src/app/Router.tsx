import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {BooksPage} from "@/pages/books";
import {Home} from "@/pages/home";
import {ConfirmPage} from "@/pages/confirm";
import {SignInPage} from "@/pages/signIn";


export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/books"/>}/>
            <Route path="/books" element={<BooksPage/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/sign-in" element={<SignInPage/>}/>
            <Route path="/sign-up" element={<SignInPage/>}/>
            <Route path="/confirm-code" element={<ConfirmPage/>}/>
        </Routes>
    );
};