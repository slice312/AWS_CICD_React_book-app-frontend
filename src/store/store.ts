import {configureStore, combineReducers} from "@reduxjs/toolkit";
// import {Middleware} from "redux";

import {bookApi} from "@/shared/api";


const rootReducer = combineReducers({
    [bookApi.reducerPath]: bookApi.reducer
});



const createStore = () => configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat([
            bookApi.middleware,
            // customMiddleWare
        ])
});

// const customMiddleWare: Middleware<object,  ReturnType<typeof store.getState>> = storeApi => next => action => {
//     console.log("Middleware triggered:", action);
//     next(action);
//     return storeApi.getState();
// };

export const store = createStore();


export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];


// TODO: refactor types
