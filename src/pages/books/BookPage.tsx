import React, {useCallback, useEffect, useState} from "react";
import Swal from "sweetalert2";
import cn from "classnames";


import {DTO, Api} from "@/shared/api";
import {ModalAddBook} from "@/components/modalAddBook";
import {BookCard} from "@/components/book";
import {Button} from "@/shared/ui/button";

import css from "./styles.module.scss";


interface Props {

}



export const BooksPage = (props: Props) => {
    const [books, setBooks] = useState<DTO.Book[]>([]);
    const [isShowAddBookModal, setIsShowAddBookModal] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const result = await Api.getAllBooks();
                console.log("API", result.data);
                setBooks(result.data);

            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    const deleteBook = useCallback(async (isbn: string) => {
        try {
            const result = await Api.deleteBook(isbn);
            if (result.status === 200) {
                setBooks(prev => prev.filter(book => book.isbn !== isbn));
                showSuccessDeleteMsg();
            }
        } catch (err) {

        }
    }, []);


    return (
        <div className={css.booksPage}>
            <div className={cn("container", css.container)}>

                <h1 className={css.title}>
                    Your Books
                </h1>

                <div className={css.list}>
                    {
                        books.map((book, i) =>
                            <BookCard key={i} book={book} onDelete={deleteBook}/>)
                    }
                </div>
                <Button className={css.btnAdd} type="button" onClick={() => setIsShowAddBookModal(true)}>
                    AddBook
                </Button>
            </div>
            <ModalAddBook isOpen={isShowAddBookModal} onClose={() => setIsShowAddBookModal(false)}/>
        </div>
    );
};


const showSuccessDeleteMsg = () => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Deleted",
        showConfirmButton: false,
        timer: 1500
    });
};