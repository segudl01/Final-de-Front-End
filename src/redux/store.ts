import { configureStore} from "@reduxjs/toolkit";
import characterSlice from "./reducer/characterReducer";

const store = configureStore({
    reducer:{
        character: characterSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;