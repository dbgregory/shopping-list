import styled from "styled-components";
import { Button, Column, Row, Theme } from "@/components/styled";
import { useDisplayAddModal } from "@/redux/hooks";

const StyledItemListContainer = styled(Column)`
  min-width: 80%;
  align-items: center;
`;

const StyledTopRow = styled(Row)`
  min-width: 100%;
  justify-content: space-between;
  align-items: end;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const StyledH2 = styled.h2`
  font-weight: normal;
  font-size: 1.25rem;
`;

const AddItemButton = styled(Button)`
  background: ${Theme.secondaryBlue};
  color: white;
  padding: 0.65rem 1rem;
  font-size: 1rem;
  border-radius: 0.35rem;
`;

export default function ItemList({ children }: { children: React.ReactNode }) {
  const openAddItemModal = useDisplayAddModal();
  return (
    <StyledItemListContainer>
      <StyledTopRow>
        <StyledH2>Your Items</StyledH2>
        <AddItemButton onClick={openAddItemModal}>Add Item</AddItemButton>
      </StyledTopRow>
      {children}
    </StyledItemListContainer>
  );
}
