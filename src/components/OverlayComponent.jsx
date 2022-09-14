import React from 'react';
import styled from 'styled-components';

const OverlayContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  color: ${(props) => props.theme.color.light};
  background-color: ${(props) => props.theme.color.dark};
  transform: ${(props) =>
    props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  transition: all 0.5s ease-in-out;
  z-index: 10;
`;

const OverlayComponent = ({ isOpen, children }) => {
  return <OverlayContainer isOpen={isOpen}>{children}</OverlayContainer>;
};

export default OverlayComponent;
