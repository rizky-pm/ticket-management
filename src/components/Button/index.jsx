import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 10px;
  background-color: ${(props) => props.theme.color.dark};
  color: ${(props) => props.theme.color.light};
  border-radius: 4px;
  outline: none;
  border: none;
`;

export const PrimaryButton = styled(Button)`
  background-color: ${(props) => props.theme.color.primary};
  padding: ${(props) => props.sm};
`;
export const GhostPrimaryButton = styled(PrimaryButton)`
  background-color: ${(props) => props.theme.color.light};
  color: ${(props) => props.theme.color.dark};
  border: 1px solid ${(props) => props.theme.color.dark};
  padding: ${(props) => props.sm};
`;

export const DangerButton = styled(Button)`
  padding: ${(props) => props.sm};
  background-color: red;
  color: white;
`;

export const GhostDangerButton = styled(DangerButton)`
  background-color: transparent;
  color: red;
  border: 2px solid red;
`;
