import { styled } from "styled-components";
import { Theme } from "@/components/styled";

const Box = styled.div`
  position: relative;
  min-width: 1.25rem;
  min-height: 1.25rem;
  max-width: 1.25rem;
  max-height: 1.25rem;
  border-radius: 0.15rem;
  background: ${Theme.primaryBlue};
`;

const BoxUnchecked = styled.div`
  min-width: 1.25rem;
  min-height: 1.25rem;
  max-width: 1.25rem;
  max-height: 1.25rem;
  border-radius: 0.15rem;
  border: 0.15rem solid gray;
  background: none;
`;

const Check = styled.div`
  position: absolute;
  top: 0;
  left: 30%;
  display: inline-block;
  transform: rotate(45deg);
  height: 1rem;
  width: 0.5rem;
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
`;

export default function CheckBox({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <Box>
        <Check />
      </Box>
    );
  }
  return <BoxUnchecked />;
}
