import { Item } from "@/types";
import { styled, css } from "styled-components";
import { DeleteOutline } from "@styled-icons/material";
import { ModeEdit } from "@styled-icons/material-outlined/ModeEdit";
import { Button, Column, Row, Theme } from "@/components/styled";
import {
  useDisplayDeleteModal,
  useDisplayEditModal,
  useSetPurchased,
} from "@/redux/hooks";
import CheckBox from "@/components/checkbox";

type Selectable = {
  select: boolean;
};

const selectedStyle = css`
  border: 0.01rem solid rgba(255, 255, 255, 0);
  background: ${Theme.faded};
`;

const StyledItemContainer = styled(Row)<Selectable>`
  padding: 1.25rem;
  border-radius: 0.25rem;
  border: 0.01rem solid gray;
  min-width: 100%;
  margin-bottom: 1rem;
  ${({ select }) => select && selectedStyle}
`;

const LineThrough = styled.span<Selectable>`
  ${({ select }) => select && `text-decoration: line-through;`}
  padding: .2rem;
`;

const ItemName = styled(LineThrough)`
  color: ${Theme.primaryText};
  font-size: 1.125rem;
  ${({ select }) =>
    select &&
    css`
      color: ${Theme.primaryBlue};
    `}
`;

const StyledButtonContainer = styled(Row)`
  margin-left: auto;
  align-items: center;
  justify-content: center;
`;

const DeleteButton = styled(Button)`
  width: min-content;
  height: min-content;
  margin-left: 1.25rem;
`;

const iconCss = css`
  color: ${Theme.iconColor};
  min-height: 1.65rem;
`;

const DeleteIcon = styled(DeleteOutline)`
  ${iconCss}
`;

const EditButton = styled(Button)`
  width: min-content;
  height: min-content;
`;

const EditIcon = styled(ModeEdit)`
  ${iconCss}
`;

const ItemDescription = styled(LineThrough)`
  color: ${Theme.lightText};
`;

const StyledItemTextContainer = styled(Column)`
  margin-left: 1rem;
`;

const ItemText = ({
  name,
  description,
  selected,
}: {
  name: string;
  description: string;
  selected: boolean;
}) => {
  return (
    <StyledItemTextContainer>
      <ItemName select={selected}>{name}</ItemName>
      <ItemDescription select={selected}>{description}</ItemDescription>
    </StyledItemTextContainer>
  );
};

export default function ListItem({ item }: { item: Item }) {
  const setPurchased = useSetPurchased();
  const displayConfirmation = useDisplayDeleteModal();
  const displayEdit = useDisplayEditModal();
  const onCheckClick = () => {
    setPurchased({
      id: item.id,
      index: item.index,
      value: !item.purchased,
    });
  };

  const onRemoveClick = () => {
    displayConfirmation(item);
  };

  const onEditClick = () => {
    displayEdit(item);
  };

  return (
    <StyledItemContainer select={item.purchased}>
      <Button onClick={onCheckClick}>
        <CheckBox checked={item.purchased} />
      </Button>
      <ItemText
        name={item.name}
        description={item.description}
        selected={item.purchased}
      />
      <StyledButtonContainer>
        <EditButton onClick={onEditClick}>
          <EditIcon />
        </EditButton>
        <DeleteButton onClick={onRemoveClick}>
          <DeleteIcon />
        </DeleteButton>
      </StyledButtonContainer>
    </StyledItemContainer>
  );
}
