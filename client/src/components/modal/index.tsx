import styled from "styled-components";
import { useModalState } from "@/redux/hooks";
import DeleteConfirmationModal from "@/components/modal/DeleteConfirmation";
import {
  ADD_ITEM,
  DELETE_CONFIRMATION,
  EDIT_ITEM,
  ModalState,
} from "@/redux/modal-state";
import AddItem from "@/components/modal/AddItem";
import EditItem from "@/components/modal/EditItem";

const ModalDim = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 100%;
  top: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 33%);
`;

const DisplayedModal = ({ modalState }: { modalState: ModalState }) => {
  switch (modalState.modalType) {
    case DELETE_CONFIRMATION:
      return <DeleteConfirmationModal item={modalState.editItem} />;
    case EDIT_ITEM:
      return <EditItem item={modalState.editItem} />;
    case ADD_ITEM:
      return <AddItem />;
    default:
      return <></>;
  }
};

export default function Modal() {
  const modalState = useModalState();

  return (
    modalState.display && (
      <ModalDim>
        <DisplayedModal modalState={modalState} />
      </ModalDim>
    )
  );
}

export * from "./AddItem";
export * from "./EditItem";
export * from "./Form";
export * from "./DeleteConfirmation";
export * from "./shared";
