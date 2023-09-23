import { createGlobalStyle, keyframes, styled } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      letter-spacing: -.01rem;
    }
`;

export const Theme = {
  primaryBlue: `#4d81b7`,
  secondaryBlue: `#1871e8`,
  faded: `#f8fafb`,
  primaryText: `#000`,
  lightText: `#7a7a7a`,
  iconColor: `#555f7c`,
};

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Button = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  appearance: none;
  background: none;
  cursor: pointer;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  border: 3px solid ${Theme.primaryBlue};
  border-top: 3px solid white;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 1s linear infinite;
`;
