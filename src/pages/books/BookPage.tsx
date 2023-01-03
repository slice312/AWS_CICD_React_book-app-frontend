import {useState} from "react";
import cn from "classnames";


import {bookApi} from "@/shared/api";
import {ModalAddBook} from "@/components/modalAddBook";
import {BookCard} from "@/components/book";
import {Button} from "@/shared/ui/button";

import css from "./styles.module.scss";
import {ModalEditBook} from "@/components/modalEditBook";
import {BooksSkeletonLoader} from "@/components/booksSkeletonLoader";




export const BooksPage = () => {
    const [isShowAddBookModal, setIsShowAddBookModal] = useState(false);
    const [selectedBookIsbn, setSelectedBookIsbn] = useState("");

    const {data: books, isLoading, error} = bookApi.useGetAllBooksQuery();

    const openBook = (isbn: string) => {
        setSelectedBookIsbn(isbn);
    };


    return (
        <div className={css.booksPage}>
            <div className={cn("container", css.container)}>

                <h1 className={css.title}>
                    Your Books
                </h1>


                {
                    (!books?.length && !isLoading) && (
                        <p className={css.emptyMsg}>
                            Your book list is empty, please add one more book
                        </p>
                    )
                }
                <div className={css.list}>
                    {
                        (isLoading || error) && <BooksSkeletonLoader qty={4}/>
                    }
                    {
                        books?.map((book, i) =>
                            <BookCard
                                key={i}
                                book={book}
                                onOpenBook={() => openBook(book.isbn)}
                            />
                        )
                    }
                </div>
                <Button
                    className={css.btnAdd}
                    type="button"
                    onClick={() => setIsShowAddBookModal(true)}
                >
                    Add Book
                </Button>
            </div>
            <ModalAddBook isOpen={isShowAddBookModal} onClose={() => setIsShowAddBookModal(false)}/>
            <ModalEditBook isbn={selectedBookIsbn} isOpen={!!selectedBookIsbn} onClose={() => setSelectedBookIsbn("")}/>
        </div>
    );
};


