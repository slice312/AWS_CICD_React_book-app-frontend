
// TODO: модель с беком проверить

export interface Book {
    isbn: string;
    title: string;
    author: string;
    description: string;
    year: number;
    pages: number;
    price?: number;
    qty?: number;
    isFavorite?: boolean;
}