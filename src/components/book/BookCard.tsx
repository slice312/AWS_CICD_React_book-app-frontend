import css from "./styles.module.scss";

import {ReactComponent as TrashIcon} from "@/assets/icons/trash.svg";
import {ReactComponent as HeartIcon} from "@/assets/icons/heart.svg";


interface Props {
    title: string;
    author: string;
    isFavorite: boolean;
}

//fill="#B1B1B1"  // fill=${props.isFavorite ? "red" : "gray"}

export const BookCard = (props: Props) => {
    return (
        <div className={css.bookCard} id="book-card">
            <div>
                <h3 className={css.title}>
                    {props.title}
                </h3>
                <h4 className={css.author}>
                    {props.author}
                </h4>
            </div>
            <div className={css.buttons}>
                <button className={css.btn} type="button">
                    <HeartIcon  width={20} height={20}  fill={props.isFavorite ? "red" : "gray"}/>
                </button>
                <button className={css.btn} type="button">
                    <TrashIcon width={20} height={20} fill="#B1B1B1"/>
                </button>
            </div>
        </div>
    );
};