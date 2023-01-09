import Swal from "sweetalert2";

import {DTO, bookApi} from "@/shared/api";
import {Alerts} from "@/shared/ui/alerts";

import css from "./styles.module.scss";

import {ReactComponent as TrashIcon} from "@/assets/icons/trash.svg";
import {ReactComponent as HeartIcon} from "@/assets/icons/heart.svg";


interface Props {
    book: DTO.Book;
    onOpenBook: (isbn: string) => void;
}


export const BookCard = ({book, onOpenBook}: Props) => {
    const [toggleFavorite] = bookApi.useToggleFavoriteMutation();
    const [deleteBookTrigger] = bookApi.useDeleteBookMutation();

    const deleteBook = async (isbn: string) => {
        try {
            await deleteBookTrigger(isbn).unwrap();
            showSuccessDeleteMsg();
        } catch (err) {

        }
    };

    const onDeleteClick = async () => {
        const dialogResult = await Alerts.deleteDialog();
        if (dialogResult.isConfirmed)
            await deleteBook(book.isbn);
    };

    return (
        <div className={css.bookCard} onClick={() => onOpenBook(book.isbn)}>
            <div>
                <h3 className={css.title}>
                    {book.title}
                </h3>
                <h4 className={css.author}>
                    {book.author}
                </h4>
                <p className={css.description}>
                    {book.description}
                </p>
            </div>
            <div className={css.buttons}>
                <button
                    className={css.btn}
                    type="button"
                    onClick={async (e) => {
                        e.stopPropagation();
                        await toggleFavorite(book.isbn).unwrap();
                    }                    }
                >
                    <HeartIcon width={20} height={20} fill={book.isFavorite ? "red" : "gray"}/>
                </button>
                <button className={css.btn} type="button" onClick={(e) => {
                    e.stopPropagation();
                    void onDeleteClick();
                }}>
                    <TrashIcon width={20} height={20} fill="#B1B1B1"/>
                </button>
            </div>
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