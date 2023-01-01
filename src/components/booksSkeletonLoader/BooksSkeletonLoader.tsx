import {Fragment} from "react";
import _ from "lodash";

import {SkeletonBookCard} from "@/components/book";


interface Props {
    qty: number;
}

export const BooksSkeletonLoader = ({qty}: Props) => {
    return (
        <Fragment>
            {
                _.range(qty)
                    .map((item, i) => <SkeletonBookCard key={i}/>)
            }
        </Fragment>
    );
};