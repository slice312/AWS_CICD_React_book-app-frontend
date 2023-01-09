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
            query: () => "Books/list",
            providesTags: result => ["Books"]
        }),
        deleteBook: build.mutation<void, string>({
            query: (isbn) => {
                return {
                    url: `Books/${isbn}`,
                    method: "DELETE"
                };
            },
            invalidatesTags: ["Books"]
        }),
        addBook: build.mutation<DTO.Book, DTO.Book>({
            query: (book) => {
                return {
                    url: "Books",
                    method: "POST",
                    body: book
                };
            },
            invalidatesTags: ["Books"]
        }),
        updateBook: build.mutation<void, UpdateRequest>({
            query: (args) => {
                return {
                    url: `Books/${args.isbn}`,
                    method: "PUT",
                    body: args.book
                };
            },
            invalidatesTags: ["Books"]
        }),
        toggleFavorite: build.mutation<boolean, string>({
            query: (isbn: string) => {
                return {
                    url: `Books/${isbn}`,
                    method: "PATCH"
                };
            },
            onQueryStarted: async (request, {dispatch, queryFulfilled, getState}) => {
                // TODO: fix weak reference
                const patch = dispatch(bookApi.util.updateQueryData("getAllBooks", undefined, (draft) => {
                    const book = draft.find(x => x.isbn === request);
                    if (book)
                        book.isFavorite = !book.isFavorite;
                }));

                try {
                    await queryFulfilled;
                } catch {
                    patch.undo();
                }
            },
        })
    })
});