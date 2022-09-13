import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  padding: 20px;
`;

export const Heading4 = styled.h4`
  font-size: 20px;
  font-weight: 600;
`;

export const Heading5 = styled.h5`
  font-size: 18px;
  font-weight: 600;
`;

export const InputField = styled.input.attrs((props) => ({
  type: 'text',
  placeholder: props.placeholder,
  maxLength: props.max,
}))`
  outline: none;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  color: ${(props) => props.theme.color.dark};
  border: 2px solid ${(props) => props.theme.color.accent};
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:focus {
    border: 2px solid ${(props) => props.theme.color.dark};
  }
`;
