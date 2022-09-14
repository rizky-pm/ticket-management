import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';

import { Container, Header2, Heading4, InputField } from '../components/Styled';
import { getAllRoles } from '../api/role';
import { PrimaryButton } from '../components/Button';
import SelectComponent from '../components/SelectComponent';

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

const ContainerWithOverlay = styled(Container)`
  height: ${(props) => (props.disableScroll ? '90vh' : 'auto')};
  overflow: ${(props) => (props.disableScroll ? 'hidden' : 'auto')};
`;

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
`;

const CustomInputField = styled(InputField)`
  border: 2px solid ${(props) => props.theme.color.dark};
  height: 60px;
  font-size: 20px;

  &:focus {
    border: 2px solid ${(props) => props.theme.color.accent};
  }
`;

const CloseIcon = styled(CloseOutlined)`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 32px;
  color: ${(props) => props.theme.color.light};
`;

const isActiveData = [
  {
    value: true,
    label: 'Active',
  },
  {
    value: false,
    label: 'Inactive',
  },
];

const RolePage = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const userSession = JSON.parse(localStorage.getItem('user'));

  console.log(isActive);

  useEffect(() => {
    getAllRoles(setIsFetching, setRoles, userSession);
  }, []);

  return (
    <>
      <ContainerWithOverlay disableScroll={isOverlayOpen}>
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
          <CloseIcon
            onClick={() => {
              setIsOverlayOpen(!isOverlayOpen);
            }}
            style={{ padding: '20px', alignSelf: 'flex-start' }}
          >
            Close
          </CloseIcon>
          <p
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
            }}
          >
            Add New Role
          </p>
          <CustomInputField placeholder='Role Name' />
          <CustomInputField placeholder='Role Code' />

          <SelectComponent
            size='large'
            data={isActiveData}
            setSelectedValue={setIsActive}
          />
          <PrimaryButton size='md'>Add</PrimaryButton>
        </OverlayContainer>
      </ContainerWithOverlay>
    </>
  );
};

export default RolePage;
