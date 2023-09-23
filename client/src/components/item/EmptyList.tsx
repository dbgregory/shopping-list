import {useDisplayAddModal} from "@/redux/hooks";
import styled from "styled-components";
import {Column, Theme} from "@/components/styled";
import {BlueButton} from "@/components/modal/shared";

const Box = styled(Column)`
  align-items: center;
  justify-content: center;
  border-radius: 0.35rem;
  border: 0.01rem solid gray;
  width: 650px;
  height: 300px;
  margin-top: 8rem;
`;

const EmptyText = styled.span`
  font-size: 1.25rem;
  font-weight: 200;
  color: ${Theme.lightText};
  margin-bottom: 1rem;
`;

export default function EmptyList() {
    const openModal = useDisplayAddModal();
    return (
        <Box>
            <EmptyText>Your shopping list is empty :(</EmptyText>
            <BlueButton onClick={openModal}>Add your first item</BlueButton>
        </Box>
    );
}
