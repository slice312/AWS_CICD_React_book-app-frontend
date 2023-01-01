import {DTO} from "@/shared/api";
import {Alerts} from "@/shared/ui/alerts";

import css from "./styles.module.scss";

import {ReactComponent as TrashIcon} from "@/assets/icons/trash.svg";
import {ReactComponent as HeartIcon} from "@/assets/icons/heart.svg";


interface Props {
    book: DTO.Book;
    onOpenBook: (isbn: string) => void;
    onDelete: (isbn: string) => Promise<void>;
}


export const BookCard = ({book, onOpenBook, onDelete}: Props) => {
    // const [toggleFavorite] = bookApi.useToggleFavoriteMutation();

    const onDeleteClick = async () => {
        const dialogResult = await Alerts.deleteDialog();
        if (dialogResult.isConfirmed)
            await onDelete(book.isbn);
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
            </div>
            <div className={css.buttons}>
                <button className={css.btn} type="button">
                    <HeartIcon  width={20} height={20}  fill={book.isFavorite ? "red" : "gray"}/>
                </button>
                <button className={css.btn} type="button" onClick={onDeleteClick}>
                    <TrashIcon width={20} height={20} fill="#B1B1B1"/>
                </button>
            </div>
        </div>
    );
};