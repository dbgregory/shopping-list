import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewItem,
  editItem,
  getAllItems,
  removeItem,
  updatePurchased,
} from "@/service/api";
import { Item, ItemResponse } from "@/types";

export interface CreateReq {
  name: string;
  description: string;
  quantity: number;
}

export interface RemoveReq {
  id: string;
  index: number;
}

export interface SetPurchasedReq {
  id: string;
  index: number;
  value: boolean;
}

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async () => await getAllItems(),
);

export const addItem = createAsyncThunk<ItemResponse, CreateReq>(
  "items/addItem",
  async ({ name, description, quantity }) =>
    await addNewItem(name, description, quantity),
);

export const updateItem = createAsyncThunk<ItemResponse, Item>(
  "items/updateItem",
  async (item) => await editItem(item),
);

export const removeAtIndex = createAsyncThunk<ItemResponse | string, RemoveReq>(
  "items/removeAtIndex",
  async ({ id, index }) => await removeItem(id, index),
);

export const setPurchased = createAsyncThunk<ItemResponse, SetPurchasedReq>(
  "items/setPurchased",
  async ({ id, index, value }) => await updatePurchased(id, index, value),
);
