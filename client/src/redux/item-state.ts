import { createSlice } from "@reduxjs/toolkit";
import { ItemResponse } from "@/types";
import {
  addItem,
  fetchItems,
  removeAtIndex,
  setPurchased,
  updateItem,
} from "@/redux/thunk";

export interface ItemState {
  items: ItemResponse[];
  loaded: boolean;
}

const initialState: ItemState = {
  items: [],
  loaded: false,
};

export const itemSlice = createSlice({
  name: "itemState",
  initialState,
  reducers: {
    setItemState(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.loaded = false;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        const item = action.payload;
        state.items.push(item);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const item = action.payload;
        const idx = state.items.findIndex((i) => item.id === i.id);
        state.items[idx] = item;
      })
      .addCase(removeAtIndex.fulfilled, (state, action) => {
        const payload = action.payload;
        if (typeof payload === "string") {
          state.items = state.items.reduce((acc, i) => {
            if (i.id != payload) {
              acc.push(i);
            }
            return acc;
          }, [] as ItemResponse[]);
        } else {
          const idx = state.items.findIndex((i) => payload.id === i.id);
          state.items[idx] = payload;
        }
      })
      .addCase(setPurchased.fulfilled, (state, action) => {
        const item = action.payload;
        const idx = state.items.findIndex((i) => item.id === i.id);
        state.items[idx] = item;
      });
  },
});
