import styled from "styled-components";
import { Button, Column, Row, Theme } from "@/components/styled";
import { useDisplayAddModal } from "@/redux/hooks";
import { ChevronBarRight } from "@styled-icons/bootstrap";

export const ButtonContainer = styled(Row)`
  margin-left: auto;
`;

export const CancelButton = styled(Button)`
  font-size: 1rem;
  padding: 1rem;
`;

export const BlueButton = styled(Button)`
  font-size: 1rem;
  margin-left: 1rem;
  background: ${Theme.secondaryBlue};
  padding: 1rem 1.25rem;
  color: white;
  border-radius: 0.35rem;
`;

const ModalContainer = styled(Column)`
  box-shadow:
    rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  border-bottom: 6px solid ${Theme.primaryBlue};
  min-width: 650px;
  background: white;
`;

const TopBar = styled(Row)`
  padding: 1.6rem;
  background: ${Theme.faded};
  color: #666;
  border-bottom: 1px solid rgba(0, 0, 0, 10%);
  justify-content: space-between;
`;

const ContentContainer = styled(Column)`
  padding: 2rem;
`;

const Title = styled.h3`
  font-weight: 500;
`;

const ChevronButton = styled(Button)`
  width: min-content;
  height: min-content;
`;

const ChevronIcon = styled(ChevronBarRight)`
  color: ${Theme.iconColor};
  min-height: 1.3rem;
`;

export const TitleText = styled.span`
  color: #666;
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
`;

export const SubText = styled.span`
  color: ${Theme.lightText};
  font-size: 1rem;
  margin-bottom: 0.75rem;
`;
export const ShoppingListModalContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const closeModal = useDisplayAddModal();
  return (
    <ModalContainer>
      <TopBar>
        <Title>SHOPPING LIST</Title>
        <ChevronButton onClick={closeModal}>
          <ChevronIcon />
        </ChevronButton>
      </TopBar>
      <ContentContainer>{children}</ContentContainer>
    </ModalContainer>
  );
};
