import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import {
  addItem,
  CreateReq,
  fetchItems,
  removeAtIndex,
  RemoveReq,
  setPurchased,
  SetPurchasedReq,
  updateItem,
} from "@/redux/thunk";
import { useCallback } from "react";
import { createSelector } from "reselect";
import { Item } from "@/types";
import {
  displayAddModal,
  displayDeleteModal,
  displayEditModal,
} from "@/redux/modal-state";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLoadedState = () =>
  useAppSelector(({ itemState }) => itemState.loaded);

export const useModalState = () =>
  useAppSelector(({ modalState }) => modalState);

export const useFormattedItems = () => useAppSelector(formatItems);

const formatItems = createSelector(
  (state: RootState) => state.itemState.items,
  (items) =>
    items.reduce((acc, item) => {
      item.purchased.forEach((p, i) => {
        acc.push({
          id: item.id,
          name: item.name,
          description: item.description,
          purchased: p,
          quantity: item.quantity,
          index: i,
        } as Item);
      });
      return acc;
    }, [] as Item[]),
);

export const useFetchAllItems = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(fetchItems()), []);
};

export const useAddItem = () => {
  const dispatch = useAppDispatch();
  return useCallback((req: CreateReq) => dispatch(addItem(req)), []);
};

export const useUpdateItem = () => {
  const dispatch = useAppDispatch();
  return useCallback((req: Item) => dispatch(updateItem(req)), []);
};

export const useRemoveAtIndex = () => {
  const dispatch = useAppDispatch();
  return useCallback((req: RemoveReq) => dispatch(removeAtIndex(req)), []);
};

export const useSetPurchased = () => {
  const dispatch = useAppDispatch();
  return useCallback((req: SetPurchasedReq) => dispatch(setPurchased(req)), []);
};

export const useDisplayAddModal = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(displayAddModal()), []);
};

export const useDisplayEditModal = () => {
  const dispatch = useAppDispatch();
  return useCallback((req: Item) => dispatch(displayEditModal(req)), []);
};

export const useDisplayDeleteModal = () => {
  const dispatch = useAppDispatch();
  return useCallback((req: Item) => dispatch(displayDeleteModal(req)), []);
};
