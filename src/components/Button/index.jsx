import styled from 'styled-components';

const renderSize = (size) => {
  switch (size) {
    case 'sm':
      return 'height: 30px; font-size: 14px;';

    case 'md':
      return 'height: 50px; font-size: 18px;';

    case 'lg':
      return 'height: 60px; font-size: 20px;';

    default:
      return 'height: 40px; font-size: 16px;';
  }
};

const Button = styled.button`
  padding: 10px 10px;
  background-color: ${(props) => props.theme.color.accent};
  color: ${(props) => props.theme.color.light};
  border-radius: 4px;
  outline: none;
  border: none;
  font-weight: bold;

  ${(props) => renderSize(props.size)}
`;

export const PrimaryButton = styled(Button)`
  /* background-color: ${(props) => props.theme.color.primary}; */
  padding: ${(props) => props.sm};
  width: 100%;
`;
export const GhostPrimaryButton = styled(PrimaryButton)`
  background-color: ${(props) => props.theme.color.light};
  color: ${(props) => props.theme.color.dark};
  border: 2px solid ${(props) => props.theme.color.dark};
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
