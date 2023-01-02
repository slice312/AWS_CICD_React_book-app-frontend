
// TODO: модель с беком проверить

export interface Book {
    isbn: string;
    title: string;
    author: string;
    description: string;
    pages: number;
    isFavorite?: boolean;
}