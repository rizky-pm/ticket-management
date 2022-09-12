import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 10px;
  background-color: ${(props) => props.theme.color.dark};
  color: ${(props) => props.theme.color.light};
  border-radius: 4px;
  outline: none;
  border: none;
`;

export const DangerButton = styled(Button)`
  background-color: red;
  color: white;
`;

export const GhostDangerButton = styled(DangerButton)`
  background-color: transparent;
  color: red;
  border: 2px solid red;
`;
