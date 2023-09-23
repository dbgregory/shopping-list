import { createSlice, createAction } from "@reduxjs/toolkit";
import { Item } from "@/types";

export const ADD_ITEM = "ADD_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const DELETE_CONFIRMATION = "DELETE_CONFIRMATION";

export interface ModalState {
  display: boolean;
  modalType: string;
  editItem: Item;
}

const initialState: ModalState = {
  display: false,
  modalType: ADD_ITEM,
  editItem: {
    id: "",
    name: "",
    description: "",
    purchased: false,
    quantity: 0,
    index: 0,
  },
};

export const displayAddModal = createAction("modal/displayAddModal");
export const displayEditModal = createAction<Item>("modal/displayEditModal");
export const displayDeleteModal = createAction<Item>(
  "modal/displayDeleteModal",
);

export const modalSlice = createSlice({
  name: "modalState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(displayAddModal, (state, action) => {
        state.modalType = ADD_ITEM;
        state.display = !state.display;
      })
      .addCase(displayEditModal, (state, action) => {
        state.modalType = EDIT_ITEM;
        state.editItem = action.payload;
        state.display = !state.display;
      })
      .addCase(displayDeleteModal, (state, action) => {
        state.modalType = DELETE_CONFIRMATION;
        state.editItem = action.payload;
        state.display = !state.display;
      });
  },
});
