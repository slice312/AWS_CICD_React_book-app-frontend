import React from "react";
import cn from "classnames";

import css from "./styles.module.scss";
import {BookCard} from "@/components/book";
import {Button} from "@/shared/ui/button";


interface Props {

}


const booksMock = [
    {
        title: "Harry Potter",
        author: "J. Rolling",
        isFavorite: true,
    },
    {
        title: "Harry Potter",
        author: "J. Rolling",
        isFavorite: false,
    },
    {
        title: "Harry Potter",
        author: "J. Rolling",
        isFavorite: false,
    },
    {
        title: "Harry Potter",
        author: "J. Rolling",
        isFavorite: false,
    },
    {
        title: "Harry Potter",
        author: "J. Rolling",
        isFavorite: false,
    },
    {
        title: "Harry Potter",
        author: "J. Rolling",
        isFavorite: false,
    },
];

export const BooksPage = (props: Props) => {
    return (
        <div className={css.booksPage}>
            <div className={cn("container", css.container)}>

                <h1 className={css.title}>
                    Your Books
                </h1>

                <div className={css.list}>
                    {
                        booksMock.map((book, i) => <BookCard key={i} {...book}/>)
                    }
                </div>
                <Button className={css.btnAdd} type="button">
                    AddBook
                </Button>
            </div>
        </div>
    );
};