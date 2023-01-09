import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {bookApi} from "@/shared/api";


const rootReducer = combineReducers({
    [bookApi.reducerPath]: bookApi.reducer
});

const createStore = () => configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat([
            bookApi.middleware
        ])
});

export const store = createStore();


export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];