import { configureStore } from "@reduxjs/toolkit";
import { itemSlice } from "./item-state";
import { modalSlice } from "@/redux/modal-state";

export const store = configureStore({
  reducer: {
    [itemSlice.name]: itemSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
