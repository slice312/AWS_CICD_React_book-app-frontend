export interface Book {
    isbn: string;
    title: string;
    author: string;
    description: string;
    pages: number;
    isFavorite?: boolean;
}


export interface FormModelError {
    status: string | number;
    data: ServerFieldErrors;
}

export interface ServerFieldErrors {
    [key: string]: string[];
}
