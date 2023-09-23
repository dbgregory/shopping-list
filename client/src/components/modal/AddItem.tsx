import { useAddItem, useDisplayAddModal } from "@/redux/hooks";
import styled from "styled-components";
import { useState } from "react";
import Form, { FormFields } from "@/components/modal/Form";
import {
  BlueButton,
  ButtonContainer,
  CancelButton,
  ShoppingListModalContainer,
  SubText,
  TitleText,
} from "@/components/modal/shared";

const init = () => ({
  name: "",
  description: "",
  quantity: 0,
});

const MarginButtonContainer = styled(ButtonContainer)`
  margin-top: 10rem;
`;

export default function AddItem() {
  const closeModal = useDisplayAddModal();
  const [fields, setFields] = useState<FormFields>(init());
  const add = useAddItem();
  const onAdd = () => {
    if (fields.name && fields.description && fields.quantity) {
      add(fields);
      handleClose();
    }
  };

  const handleClose = () => {
    setFields(init());
    closeModal();
  };

  return (
    <ShoppingListModalContainer>
      <TitleText>Add an Item</TitleText>
      <SubText>Add your new item below</SubText>
      <Form fields={fields} setFields={setFields} />
      <MarginButtonContainer>
        <CancelButton onClick={handleClose}>Cancel</CancelButton>
        <BlueButton onClick={onAdd}>Add Task</BlueButton>
      </MarginButtonContainer>
    </ShoppingListModalContainer>
  );
}
