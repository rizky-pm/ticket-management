import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';

import { Container, Header2, Heading4 } from '../components/Styled';
import { getAllRoles } from '../api/role';

const renderCardBackgroundColor = (roleCode) => {
  //   console.log(roleCode);
  switch (roleCode) {
    case 'ESA':
      return 'background-color: #FF3C38';

    case 'PIC':
      return 'background-color: #FFD60A';

    case 'CUST':
      return 'background-color: #00C2FF';

    default:
      break;
  }
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardContainer = styled.div`
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  ${(props) => renderCardBackgroundColor(props.roleCode)};
  gap: 10px;
  overflow: hidden;
  position: relative;
`;

const CardRoleName = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const CardRoleCode = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const OverlayContainer = styled.div`
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
`;

const RolePage = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [roles, setRoles] = useState([]);
  const userSession = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getAllRoles(setIsFetching, setRoles, userSession);
  }, []);

  return (
    <>
      <Container disableScroll={isOverlayOpen}>
        <Header2>
          <Heading4>Role List</Heading4>

          <label htmlFor='edit-mode'>
            <PlusSquareOutlined style={{ fontSize: '24px' }} />
          </label>
          <input
            style={{
              display: 'none',
            }}
            type='checkbox'
            name='edit-mode'
            id='edit-mode'
            value={isOverlayOpen}
            onChange={() => setIsOverlayOpen(!isOverlayOpen)}
          />
        </Header2>
        <CardWrapper>
          {roles?.map((role) => {
            return (
              <CardContainer key={role.id} roleCode={role.roleCode}>
                <CardRoleName>{role.roleName}</CardRoleName>
                <CardRoleCode>{role.roleCode}</CardRoleCode>
              </CardContainer>
            );
          })}
        </CardWrapper>
        <OverlayContainer isOpen={isOverlayOpen}>
          <p
            onClick={() => {
              setIsOverlayOpen(!isOverlayOpen);
            }}
            style={{ padding: '20px' }}
          >
            Close
          </p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
          officiis iusto natus id illo quibusdam aspernatur delectus similique
          voluptate quisquam cumque, ipsum praesentium distinctio voluptas quam
          aperiam magni, eum unde.
        </OverlayContainer>
      </Container>
    </>
  );
};

export default RolePage;
