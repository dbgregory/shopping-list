import { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components";
import { Theme } from "@/components/styled";

export type FormFields = {
  name: string;
  description: string;
  quantity: number;
};

const common = css`
  padding: 0.75rem;
  border-radius: 0.35rem;
  margin-bottom: 1rem;
  font: inherit;
  border: 1px solid rgba(0, 0, 0, 15%);
  color: ${Theme.lightText};
`;

const AreaContainer = styled.div`
  position: relative;
  min-width: 100%;
`;

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  ${common}
`;

const FloatCount = styled.span`
  position: absolute;
  z-index: 1;
  bottom: 1.75rem;
  right: 0.75rem;
  color: ${Theme.lightText};
`;

const Input = styled.input`
  ${common}
`;
export default function Form({
  fields,
  setFields,
}: {
  fields: FormFields;
  setFields: Dispatch<SetStateAction<FormFields>>;
}) {
  const setName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      name: e.target.value,
    });
  };

  const setDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 100) {
      setFields({
        ...fields,
        description: e.target.value,
      });
    }
  };

  const setQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.target.value);
    if (!isNaN(n)) {
      setFields({
        ...fields,
        quantity: n,
      });
    }
    if (e.target.value === "") {
      setFields({
        ...fields,
        quantity: 0,
      });
    }
  };

  return (
    <>
      <Input placeholder={"Item Name"} value={fields.name} onChange={setName} />
      <AreaContainer>
        <TextArea
          placeholder={"Description"}
          value={fields.description}
          onChange={setDescription}
          rows={8}
        />
        <FloatCount>{`${fields.description.length}/100`}</FloatCount>
      </AreaContainer>
      <Input
        placeholder={"How many?"}
        value={fields.quantity > 0 ? fields.quantity : ""}
        onChange={setQuantity}
      />
    </>
  );
}
