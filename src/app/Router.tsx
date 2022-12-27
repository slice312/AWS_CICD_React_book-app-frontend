import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {BooksPage} from "@/pages/books";


export const Router = () => {
    return (
        <Routes>
            <Route path="/404" element={<div/>}/>
            <Route path="/" element={<Navigate to="/books"/>}/>
            <Route path="/books" element={<BooksPage/>}/>
        </Routes>
    );
};