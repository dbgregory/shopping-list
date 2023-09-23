import styled from "styled-components";
import {
  BlueButton,
  ButtonContainer,
  CancelButton,
  ShoppingListModalContainer,
  SubText,
  TitleText,
} from "@/components/modal/shared";
import { useDisplayAddModal, useUpdateItem } from "@/redux/hooks";
import { useState } from "react";
import Form, { FormFields } from "@/components/modal/Form";
import { Item } from "@/types";

const MarginButtonContainer = styled(ButtonContainer)`
  margin-top: 10rem;
`;

export default function EditItem({ item }: { item: Item }) {
  const closeModal = useDisplayAddModal();
  const [fields, setFields] = useState<FormFields>({
    name: item.name,
    description: item.description,
    quantity: item.quantity,
  });
  const edit = useUpdateItem();
  const onAdd = () => {
    if (fields.name && fields.description && fields.quantity) {
      edit({
        ...item,
        ...fields,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFields({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
    });
    closeModal();
  };

  return (
    <ShoppingListModalContainer>
      <TitleText>Edit an Item</TitleText>
      <SubText>Edit your item below</SubText>
      <Form fields={fields} setFields={setFields} />
      <MarginButtonContainer>
        <CancelButton onClick={handleClose}>Cancel</CancelButton>
        <BlueButton onClick={onAdd}>Save Item</BlueButton>
      </MarginButtonContainer>
    </ShoppingListModalContainer>
  );
}
