import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  padding: 20px;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Header2 = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Heading4 = styled.h4`
  font-size: 20px;
  font-weight: 600;
`;

export const Heading5 = styled.h5`
  font-size: 18px;
  font-weight: 600;
`;

export const HighlightedText = styled.span`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.theme.color.accent};
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

export const ToolContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.color.dark};
  /* width: 20%; */
  /* height: ${(props) => props.height || '100%'}; */
  height: 100%;
  /* aspect-ratio: 1 / 1; */
  transform: ${(props) =>
    props.isHovered ? 'translateX(0)' : 'translateX(100%)'};
  transition: all 0.3s ease-in-out;
  color: white;
  z-index: 10;
`;
