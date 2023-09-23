"use client";
import { useEffect } from "react";
import {
  useFetchAllItems,
  useFormattedItems,
  useLoadedState,
} from "@/redux/hooks";
import ItemList from "@/components/item/ItemList";
import ListItem from "@/components/item/ListItem";
import MainLayout from "@/components/layout/MainLayout";
import { GlobalStyles, Loader } from "@/components/styled";
import Modal from "@/components/modal";
import EmptyList from "@/components/item/EmptyList";
import styled from "styled-components";

const Spinner = styled(Loader)`
  margin-top: 8rem;
`;
export default function Home() {
  const items = useFormattedItems();
  const fetchAllItems = useFetchAllItems();
  const loaded = useLoadedState();

  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <main>
      <GlobalStyles />
      <MainLayout>
        {!loaded && <Spinner />}
        {loaded &&
          (items.length ? (
            <ItemList>
              {items.map((item) => (
                <ListItem key={`${item.id}${item.index}`} item={item} />
              ))}
            </ItemList>
          ) : (
            <EmptyList />
          ))}
      </MainLayout>
      <Modal />
    </main>
  );
}
