import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {DTO} from "@/shared/api";


interface UpdateRequest {
    isbn: string;
    book: DTO.Book;
}

export const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_WEB_API_URL}`}),
    refetchOnReconnect: false,
    keepUnusedDataFor: 200, // cache lifetime in seconds
    tagTypes: ["Books"],
    endpoints: (build) => ({
        getAllBooks: build.query<DTO.Book[], void>({
            query: () => "Book/list",
            providesTags: result => ["Books"]
        }),
        deleteBook: build.mutation<void, string>({
            query: (isbn) => {
                return {
                    url: `Book/${isbn}`,
                    method: "DELETE"
                };
            },
            invalidatesTags: ["Books"]
        }),
        addBook: build.mutation<void, DTO.Book>({
            query: (book) => {
                return {
                    url: "Book",
                    method: "POST",
                    body: book
                };
            }
        }),
        updateBook: build.mutation<void, UpdateRequest>({
            query: (args) => {
                return {
                    url: `Book/${args.isbn}`,
                    method: "PUT",
                    body: args.book
                };
            },
            invalidatesTags: ["Books"]
        }),
        toggleFavorite: build.mutation<boolean, string>({
            query: (isbn: string) => {
                return {
                    url: `Book/${isbn}`,
                    method: "PATCH"
                };
            },
            invalidatesTags: ["Books"]
        })
    })
});