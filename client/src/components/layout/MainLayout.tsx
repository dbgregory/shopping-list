import { Column, Row, Theme } from "@/components/styled";
import styled from "styled-components";

const StyledMainLayout = styled(Column)`
  align-items: center;
  min-width: 100%;
  min-height: 100%;
`;

const StyledTopBar = styled(Row)`
  padding: 1.5rem;
  background: ${Theme.primaryBlue};
  color: white;
  width: 100%;
`;

const StyledTitle = styled.h1`
  font-weight: normal;
  font-size: 1.25rem;
`;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StyledMainLayout>
        <StyledTopBar>
          <StyledTitle>SHOPPING LIST</StyledTitle>
        </StyledTopBar>
        {children}
      </StyledMainLayout>
    </>
  );
}
