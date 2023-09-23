import { useDisplayDeleteModal, useRemoveAtIndex } from "@/redux/hooks";
import { Item } from "@/types";
import { Column, Theme } from "@/components/styled";
import styled from "styled-components";
import {
  BlueButton,
  ButtonContainer,
  CancelButton,
} from "@/components/modal/shared";

const Title = styled.span`
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
`;

const SubText = styled.span`
  color: ${Theme.lightText};
  margin-bottom: 4rem;
`;

const ModalContainer = styled(Column)`
  padding: 2rem;
  border-radius: 0.35rem;
  background: white;
  max-width: 475px;
  box-shadow:
    rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

export default function DeleteConfirmationModal({ item }: { item: Item }) {
  const closeDeleteModal = useDisplayDeleteModal();
  const deleteItem = useRemoveAtIndex();
  const close = () => {
    closeDeleteModal(item);
  };

  const onDelete = () => {
    if (item) {
      deleteItem({
        id: item.id,
        index: item.index,
      });
    }
    close();
  };

  return (
    <ModalContainer>
      <Title>Delete Item?</Title>
      <SubText>
        Are you sure you want to delete this item? This can not be undone.
      </SubText>
      <ButtonContainer>
        <CancelButton onClick={close}>Cancel</CancelButton>
        <BlueButton onClick={onDelete}>Delete</BlueButton>
      </ButtonContainer>
    </ModalContainer>
  );
}
