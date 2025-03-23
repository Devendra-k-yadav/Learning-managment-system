import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./admin.slice";
import cardSlice from "./card.slice";
import productSlice from './product.slice';

//>>>initialize>>>>
const store = configureStore({
    reducer: {
        admin: adminSlice,
        card: cardSlice,
        product: productSlice,
    },
});



export default store;