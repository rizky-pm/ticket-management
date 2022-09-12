import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: ${(props) => props.theme.color.dark};
  padding: 20px;
  color: ${(props) => props.theme.color.light};
`;

const Logo = styled.span`
  color: ${(props) => props.theme.color.light};
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 5px;
  font-size: 20px;
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo>Ticket</Logo>
    </Nav>
  );
};

export default Navbar;
